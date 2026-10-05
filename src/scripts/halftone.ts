// Live halftone screens (components/Halftone.tsx). Each <canvas data-halftone>
// covers its positioned parent with data-src, screened the way Dotraster's AM
// Screening does it: circle dots on a benday layout (rows offset by half a
// dot), one dot every 72 / data-lpi pixels, each dot's area matching the
// image's average brightness under it, white on black.
//
// Those pixels are the screen's units: image pixels, or with data-fixed CSS
// pixels, so dots keep their size at any width. The cover-cropped image is
// resampled to one texel per unit and brightness is read per texel, as
// Dotraster reads it per pixel of the image it is given, so the image's grain
// roughens the dot edges the same way at any scale. The screen is static: it
// repaints only when the canvas changes size.

const DPI = 72;

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform sampler2D u_image;
uniform float u_height;    // canvas height, device pixels
uniform float u_unit;      // device pixels per screen unit
uniform vec2 u_origin;     // units from the canvas corner to the screen's
uniform vec2 u_texOrigin;  // units from the screen's corner to the texture's
uniform vec2 u_texSize;    // units
uniform float u_pitch;     // units between dots in a row
uniform float u_row;       // units between rows

// The nearest dot centre in row j, which is offset by half a dot when even.
vec2 nearest(vec2 p, float j) {
  float off = mod(j, 2.0) < 0.5 ? 0.5 * u_pitch : 0.0;
  float x = floor((p.x - off) / u_pitch + 0.5) * u_pitch + off;
  return vec2(x, j * u_row);
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, u_height - gl_FragCoord.y) / u_unit - u_origin;

  vec3 rgb = texture2D(u_image, (floor(p) - u_texOrigin + 0.5) / u_texSize).rgb;
  float lum = (rgb.r + rgb.g + rgb.b) / 3.0;

  // Dotraster centres its dots on pixel centres.
  vec2 q = p - 0.5;
  float j = floor(q.y / u_row);
  float d = min(distance(q, nearest(q, j)), distance(q, nearest(q, j + 1.0)));

  // A dot covering lum of its cell, edged over one device pixel.
  float r = sqrt(lum * u_pitch * u_row / 3.14159265);
  float white = clamp((r - d) * u_unit + 0.5, 0.0, 1.0);
  gl_FragColor = vec4(vec3(white), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function halftone(canvas: HTMLCanvasElement) {
  const { src, lpi = "6" } = canvas.dataset;
  const fixed = "fixed" in canvas.dataset;
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  const scratch = document.createElement("canvas").getContext("2d");
  if (!src || !gl || !scratch) return;

  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  // One triangle that covers the viewport.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  // Read one texel per unit, as is: not a power of two, so no mipmaps or repeat.
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const pitch = DPI / Number(lpi);
  gl.uniform1f(uniform("u_pitch"), pitch);
  gl.uniform1f(uniform("u_row"), Math.round((pitch * Math.sqrt(3)) / 2));

  const image = new Image();

  const draw = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    if (!image.complete || !image.naturalWidth) return;

    // object-cover, object-center, in units. The screen starts at the canvas
    // corner, or at the image's when it is measured in image pixels.
    const w = image.naturalWidth;
    const h = image.naturalHeight;
    const cover = Math.max(canvas.width / w, canvas.height / h);
    const unit = fixed ? dpr : cover;
    const imageX = (canvas.width - w * cover) / 2 / unit;
    const imageY = (canvas.height - h * cover) / 2 / unit;
    const originX = fixed ? 0 : imageX;
    const originY = fixed ? 0 : imageY;

    // The image resampled to whole units of the screen, over the canvas.
    const texX = Math.floor(-originX);
    const texY = Math.floor(-originY);
    const texW = Math.ceil(canvas.width / unit - originX - texX);
    const texH = Math.ceil(canvas.height / unit - originY - texY);
    scratch.canvas.width = texW;
    scratch.canvas.height = texH;
    scratch.imageSmoothingQuality = "high";
    scratch.drawImage(
      image,
      imageX - originX - texX,
      imageY - originY - texY,
      (w * cover) / unit,
      (h * cover) / unit,
    );
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, scratch.canvas);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uniform("u_height"), canvas.height);
    gl.uniform1f(uniform("u_unit"), unit);
    gl.uniform2f(uniform("u_origin"), originX, originY);
    gl.uniform2f(uniform("u_texOrigin"), texX, texY);
    gl.uniform2f(uniform("u_texSize"), texW, texH);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  image.onload = draw;
  image.src = src;

  new ResizeObserver(draw).observe(canvas);
}

document.querySelectorAll<HTMLCanvasElement>("canvas[data-halftone]").forEach(halftone);
