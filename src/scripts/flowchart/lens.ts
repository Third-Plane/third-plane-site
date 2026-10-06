// The flowchart's screen: a WebGL pass that shows a finished 2D frame as if
// through the curved glass of a CRT. Barrel distortion pulls the picture in
// toward the centre, more the further out it is, so no line stays straight.
// The picture is scaled to keep its corners on the corners of the canvas, so
// nothing is cut away and no edge is left bare.
//
// The glass also splits colour, as a cheap lens does: red lands a little
// outward of where it should and blue a little inward, nothing at the centre
// and the most at the corners, so every line out toward the edges carries a
// thin red fringe on one side and a blue one on the other.
//
// And it is ruled with faint scanlines, every LINE_PITCH CSS pixels. They are
// part of the picture, so they bend with it.
//
// Over it all lies a fine grain that changes every frame, like noise on the
// signal. It is in CSS pixels, so it reads as grain on any screen.
//
// And a soft bar rolls slowly down the picture, as when a camera films a
// tube, once every ROLL_PERIOD seconds. It strengthens the chart's ink as it
// passes and lifts the whole screen a touch toward white, which is what makes
// it read: a band of slightly heavier hairlines alone barely shows. It stands
// still when there is no time to move it by (the still frame drawn for
// reduced motion), so it is left out of that.
//
// Further effects (bloom) belong in FRAGMENT.

const LINE_PITCH = 3;
const ROLL_PERIOD = 9;
// The bar's centre runs from ROLL_FROM to ROLL_TO picture heights down, so it
// enters and leaves out of sight.
const ROLL_FROM = -0.3;
const ROLL_TO = 1.3;

const VERTEX = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// p is the pixel from the centre, -1 to 1 on each axis. Its distance is taken
// in the canvas's own proportions (u_shape), so the curve is round however
// wide the band is, and reaches 1 at the corners.
//
// The split moves red and blue along p, which grows with the distance from
// the centre in pixels; u_fringe sets it so the corners split by the full
// amount. A pixel has one coverage but the three channels now cover it
// differently, so it takes the strongest of the three, and a channel that
// covers less is made up with the paper behind (u_paper, the hero's
// background). Each channel then sits over the page as if it had its own
// coverage, and the fringes come out coloured, not dark.
//
// The scanlines are a wash of ink (u_ink, the hero's text colour) laid over
// the result, at most u_scan strong, on a soft cosine down the picture's own
// height, u_lines of them in all. They cover paper and glyphs alike, as on a
// tube. High precision where there is any: a few hundred cycles down the
// band is too fine for half floats.
//
// The grain is a hash of the CSS pixel, shifted by a new u_seed each frame:
// up to u_noise of white or of ink, laid over everything.
//
// The bar is centred u_band picture heights down and about a quarter of the
// picture tall, on a gaussian. Within it the ink is strengthened by up to
// u_roll, and after the scanlines a wash of white up to u_glow goes over
// everything; the grain goes over that.
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D u_frame;
uniform float u_curve;
uniform float u_fringe;
uniform vec2 u_shape;
uniform vec3 u_paper;
uniform vec3 u_ink;
uniform float u_scan;
uniform float u_lines;
uniform float u_noise;
uniform float u_dpr;
uniform vec2 u_seed;
uniform float u_roll;
uniform float u_band;
uniform float u_glow;
varying vec2 v_uv;
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec4 tap(vec2 src) {
  return texture2D(u_frame, vec2(src.x, -src.y) * 0.5 + 0.5);
}
void main() {
  vec2 p = v_uv * 2.0 - 1.0;
  vec2 q = p * u_shape;
  vec2 src = p * (1.0 + u_curve * dot(q, q)) / (1.0 + u_curve);
  vec4 r = tap(src + p * u_fringe);
  vec4 g = tap(src);
  vec4 b = tap(src - p * u_fringe);
  float a = max(max(r.a, g.a), b.a);
  vec3 lack = a - vec3(r.a, g.a, b.a);
  vec4 picture = vec4(vec3(r.r, g.g, b.b) + u_paper * lack, a);
  float y = 0.5 - 0.5 * src.y;
  float d = (y - u_band) / 0.12;
  float bar = exp(-d * d);
  picture = min(picture * (1.0 + u_roll * bar), vec4(1.0));
  float s = u_scan * (0.5 + 0.5 * cos(6.2831853 * y * u_lines));
  vec4 scanned = vec4(u_ink * s, s) + picture * (1.0 - s);
  float w = u_glow * bar;
  scanned = vec4(w) + scanned * (1.0 - w);
  float n = (hash(floor(gl_FragCoord.xy / u_dpr) + u_seed) * 2.0 - 1.0) * u_noise;
  vec4 grain = n > 0.0 ? vec4(n) : vec4(u_ink * -n, -n);
  gl_FragColor = grain + scanned * (1.0 - abs(n));
}`;

export type Lens = {
  // The canvas's size in device pixels, and how many to a CSS pixel.
  resize: (width: number, height: number, dpr: number) => void;
  // time is in seconds, and moves the rolling bar; without it, the bar is
  // left out.
  render: (frame: HTMLCanvasElement, time?: number) => void;
};

export type Optics = {
  // The strength of the bend.
  curve: number;
  // How far the colours part at the corners, in CSS pixels.
  fringe: number;
  // How dark the scanlines are at their darkest, 0 to 1.
  scan: number;
  // How strong the grain is at its strongest, 0 to 1.
  noise: number;
  // How much the rolling bar strengthens the ink, and how far it lifts the
  // whole screen toward white (0 to 1); 0 for both is no bar.
  roll: number;
  glow: number;
  // The colour the canvas sits on, and the colour its scanlines are washed in,
  // as 0 to 1 RGB.
  paper: readonly number[];
  ink: readonly number[];
};

export function createLens(
  canvas: HTMLCanvasElement,
  { curve, fringe, scan, noise, roll, glow, paper, ink }: Optics,
): Lens | undefined {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
  if (!gl) return undefined;

  const shader = (type: number, source: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;
  gl.useProgram(program);

  // One triangle that covers the canvas.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  // The frame is any size, so no mipmaps and clamped edges (WebGL 1).
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  gl.uniform1i(gl.getUniformLocation(program, "u_frame"), 0);
  gl.uniform1f(gl.getUniformLocation(program, "u_curve"), curve);
  gl.uniform3f(gl.getUniformLocation(program, "u_paper"), paper[0], paper[1], paper[2]);
  gl.uniform3f(gl.getUniformLocation(program, "u_ink"), ink[0], ink[1], ink[2]);
  gl.uniform1f(gl.getUniformLocation(program, "u_scan"), scan);
  gl.uniform1f(gl.getUniformLocation(program, "u_noise"), noise);
  const shape = gl.getUniformLocation(program, "u_shape");
  const split = gl.getUniformLocation(program, "u_fringe");
  const lines = gl.getUniformLocation(program, "u_lines");
  const pixel = gl.getUniformLocation(program, "u_dpr");
  const seed = gl.getUniformLocation(program, "u_seed");
  const strength = gl.getUniformLocation(program, "u_roll");
  const band = gl.getUniformLocation(program, "u_band");
  const lift = gl.getUniformLocation(program, "u_glow");

  return {
    resize(width, height, dpr) {
      gl.viewport(0, 0, width, height);
      const aspect = width / height;
      const norm = Math.hypot(aspect, 1);
      gl.uniform2f(shape, aspect / norm, 1 / norm);
      gl.uniform1f(split, (fringe * dpr) / Math.hypot(width / 2, height / 2));
      gl.uniform1f(lines, height / (LINE_PITCH * dpr));
      gl.uniform1f(pixel, dpr);
    },
    render(frame, time) {
      if (gl.isContextLost()) return;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, frame);
      gl.uniform2f(seed, Math.floor(Math.random() * 4096), Math.floor(Math.random() * 4096));
      gl.uniform1f(strength, time === undefined ? 0 : roll);
      gl.uniform1f(lift, time === undefined ? 0 : glow);
      if (time !== undefined) {
        const phase = (time % ROLL_PERIOD) / ROLL_PERIOD;
        gl.uniform1f(band, ROLL_FROM + phase * (ROLL_TO - ROLL_FROM));
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
