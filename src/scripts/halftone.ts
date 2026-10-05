// Live halftone screens (components/Halftone.tsx). Each <canvas data-halftone>
// covers its positioned parent with data-src, screened the way Dotraster's AM
// Screening does it: circle dots on a benday layout (rows offset by half a
// dot), one dot every 72 / data-lpi image pixels, each dot's area matching the
// image's average brightness under it, white on black. Brightness is read per
// pixel rather than per dot, so the image's grain roughens the dot edges as it
// does in Dotraster's output. The screen is static: it repaints only when the
// canvas changes size.

const DPI = 72;

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform sampler2D u_image;
uniform vec2 u_imageSize;  // image pixels
uniform vec2 u_canvasSize; // device pixels
uniform float u_pitch;     // image pixels between dots in a row
uniform float u_row;       // image pixels between rows

// The nearest dot centre in row j, which is offset by half a dot when even.
vec2 nearest(vec2 p, float j) {
  float off = mod(j, 2.0) < 0.5 ? 0.5 * u_pitch : 0.0;
  float x = floor((p.x - off) / u_pitch + 0.5) * u_pitch + off;
  return vec2(x, j * u_row);
}

void main() {
  // object-cover, object-center: device pixel to image pixel.
  float scale = max(u_canvasSize.x / u_imageSize.x, u_canvasSize.y / u_imageSize.y);
  vec2 offset = 0.5 * (u_canvasSize - u_imageSize * scale);
  vec2 frag = vec2(gl_FragCoord.x, u_canvasSize.y - gl_FragCoord.y);
  vec2 p = (frag - offset) / scale;

  vec3 rgb = texture2D(u_image, p / u_imageSize).rgb;
  float lum = (rgb.r + rgb.g + rgb.b) / 3.0;

  // Dotraster centres its dots on pixel centres.
  vec2 q = p - 0.5;
  float j = floor(q.y / u_row);
  float d = min(distance(q, nearest(q, j)), distance(q, nearest(q, j + 1.0)));

  // A dot covering lum of its cell, edged over one device pixel.
  float r = sqrt(lum * u_pitch * u_row / 3.14159265);
  float white = clamp((r - d) * scale + 0.5, 0.0, 1.0);
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
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!src || !gl) return;

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

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const pitch = DPI / Number(lpi);
  gl.uniform1f(uniform("u_pitch"), pitch);
  gl.uniform1f(uniform("u_row"), Math.round((pitch * Math.sqrt(3)) / 2));

  const image = new Image();
  let ready = false;

  const draw = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    if (!ready) return;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniform("u_canvasSize"), canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    // Not a power of two, so no mipmaps or repeat.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform2f(uniform("u_imageSize"), image.naturalWidth, image.naturalHeight);
    ready = true;
    draw();
  };
  image.src = src;

  new ResizeObserver(draw).observe(canvas);
}

document.querySelectorAll<HTMLCanvasElement>("canvas[data-halftone]").forEach(halftone);
