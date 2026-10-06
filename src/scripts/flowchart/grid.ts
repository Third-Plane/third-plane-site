// A character grid for drawing diagrams in Berkeley Mono's box-drawing set.
// Pure data, no DOM: boxes, routed lines, labels and dithered shadows are laid
// into a fixed grid of cells, and the result is a flat list of glyphs with a
// kind for each, which the renderer paints and animates.
//
// Lines are kept as connection masks (one bit per side of the cell) until the
// end, so routes that cross, merge or tap a box border resolve to the right
// junction (├ ┬ ┼ ...) on their own.

export const N = 1;
export const E = 2;
export const S = 4;
export const W = 8;

// The junction for each mask, indexed by its bits (N E S W): a cell open to
// the north and east (3) is └, open on all four sides (15) is ┼.
const SINGLE = " │─└││┌├─┘─┴┐┤┬┼";
const DOUBLE = " ║═╚║║╔╠═╝═╩╗╣╦╬";

const HEADS = {
  solid: { [E]: "▶", [W]: "◀", [N]: "▲", [S]: "▼" },
  hollow: { [E]: "▷", [W]: "◁", [N]: "△", [S]: "▽" },
} as const;

// What a cell is, which sets how bright it sits at rest.
export const Kind = {
  empty: 0,
  line: 1,
  frame: 2,
  text: 3,
  strong: 4,
  shade: 5,
  head: 6,
} as const;
export type Kind = (typeof Kind)[keyof typeof Kind];

export type Point = readonly [x: number, y: number];

// Waypoints written flat, x then y: via(16, 4, 19, 4) is [[16, 4], [19, 4]].
export const via = (...xy: number[]): Point[] =>
  xy.flatMap((x, i) => (i % 2 ? [] : [[x, xy[i + 1]] as const]));
export type Head = keyof typeof HEADS | "none";

export type Grid = ReturnType<typeof createGrid>;

export function createGrid(cols: number, rows: number) {
  const size = cols * rows;
  const single = new Uint8Array(size);
  const double = new Uint8Array(size);
  const glyph: string[] = new Array(size).fill("");
  const kind = new Uint8Array(size);
  // Cells a box covers, so shadows and stray lines stay off them.
  const solid = new Uint8Array(size);

  const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < cols && y < rows;
  const at = (x: number, y: number) => y * cols + x;

  const join = (mask: Uint8Array, x: number, y: number, bits: number, k: Kind) => {
    if (!inside(x, y)) return;
    const i = at(x, y);
    mask[i] |= bits;
    if (kind[i] === Kind.empty || kind[i] === Kind.shade) kind[i] = k;
  };

  const put = (x: number, y: number, ch: string, k: Kind) => {
    if (!inside(x, y)) return;
    const i = at(x, y);
    glyph[i] = ch;
    kind[i] = ch === " " ? Kind.empty : k;
  };

  // Text, one glyph a cell. A space is written too: it blanks what is below
  // (a label sitting on a line breaks the line).
  const text = (x: number, y: number, str: string, k: Kind = Kind.text) => {
    [...str].forEach((ch, i) => put(x + i, y, ch, k));
  };

  // A box with its border on the outer cells. The cells of its border are
  // returned (clockwise from the top left), and its interior is cleared.
  const box = (
    x: number,
    y: number,
    w: number,
    h: number,
    frame: "single" | "double" = "single",
  ) => {
    const mask = frame === "double" ? double : single;
    const border: number[] = [];
    for (let j = y; j < y + h; j++) {
      for (let i = x; i < x + w; i++) {
        if (!inside(i, j)) continue;
        solid[at(i, j)] = 1;
        const edge = i === x || i === x + w - 1 || j === y || j === y + h - 1;
        if (!edge) put(i, j, " ", Kind.empty);
      }
    }
    const link = (i: number, j: number, bits: number) => join(mask, i, j, bits, Kind.frame);
    for (let i = x; i < x + w - 1; i++) {
      link(i, y, E);
      link(i + 1, y, W);
      link(i, y + h - 1, E);
      link(i + 1, y + h - 1, W);
    }
    for (let j = y; j < y + h - 1; j++) {
      link(x, j, S);
      link(x, j + 1, N);
      link(x + w - 1, j, S);
      link(x + w - 1, j + 1, N);
    }
    for (let i = x; i < x + w; i++) border.push(at(i, y));
    for (let j = y + 1; j < y + h; j++) border.push(at(x + w - 1, j));
    for (let i = x + w - 2; i >= x; i--) border.push(at(i, y + h - 1));
    for (let j = y + h - 2; j > y; j--) border.push(at(x, j));
    return border.filter((i) => i >= 0 && i < size);
  };

  // An orthogonal line through the waypoints, ending in an arrowhead. Returns
  // its cells in order, start to end, which is the path a packet travels.
  const route = (points: readonly Point[], head: Head = "solid") => {
    const path: number[] = [];
    let last = 0;
    for (let p = 1; p < points.length; p++) {
      const [x0, y0] = points[p - 1];
      const [x1, y1] = points[p];
      const dx = Math.sign(x1 - x0);
      const dy = Math.sign(y1 - y0);
      const out = dx > 0 ? E : dx < 0 ? W : dy > 0 ? S : N;
      const back = dx > 0 ? W : dx < 0 ? E : dy > 0 ? N : S;
      let x = x0;
      let y = y0;
      if (p === 1) path.push(at(x, y));
      while (x !== x1 || y !== y1) {
        join(single, x, y, out, Kind.line);
        x += dx;
        y += dy;
        join(single, x, y, back, Kind.line);
        path.push(at(x, y));
      }
      last = out;
    }
    if (head !== "none" && points.length > 1) {
      const [x, y] = points[points.length - 1];
      put(x, y, HEADS[head][last as keyof (typeof HEADS)["solid"]], Kind.head);
    }
    return path.filter((i) => i >= 0 && i < size);
  };

  // A dithered drop shadow, down and to the right, as in a printed chart. It
  // only lands on empty cells, so lines running past stay whole.
  const shadow = (x: number, y: number, w: number, h: number, dx = 2, dy = 1) => {
    for (let j = y + dy; j < y + h + dy; j++) {
      for (let i = x + dx; i < x + w + dx; i++) {
        if (!inside(i, j) || (i < x + w && j < y + h)) continue;
        const c = at(i, j);
        if (kind[c] === Kind.empty && !glyph[c] && !solid[c]) {
          glyph[c] = "░";
          kind[c] = Kind.shade;
        }
      }
    }
  };

  // The final glyph of every cell: written text first, then junctions.
  const resolve = () =>
    glyph.map((ch, i) => {
      if (ch) return ch;
      if (double[i]) return DOUBLE[double[i]];
      if (single[i]) return SINGLE[single[i]];
      return "";
    });

  return { cols, rows, at, kind, text, box, route, shadow, resolve };
}
