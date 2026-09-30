import { foldStroke, outlineOn } from "~/lib/color";
import type { GlyphId } from "~/lib/types";

interface GlyphShape {
  /** Filled silhouette paths. */
  body: readonly string[];
  /** Stroked detail lines drawn on top. */
  details?: readonly string[];
  /** Circles drawn on top (cx, cy, r). */
  dots?: readonly (readonly [number, number, number])[];
}

const GLYPHS: Record<GlyphId, GlyphShape> = {
  tee: {
    body: [
      "M23 12 L13 17 L8 28 L15 31 L18 25 V50 C18 51 19 52 20 52 H44 C45 52 46 51 46 50 V25 L49 31 L56 28 L51 17 L41 12 C38 16 35 18 32 18 C29 18 26 16 23 12 Z",
    ],
    details: ["M18 47 H46", "M26 13 C28 16 36 16 38 13"],
  },
  polo: {
    body: [
      "M23 12 L13 17 L8 28 L15 31 L18 25 V50 C18 51 19 52 20 52 H44 C45 52 46 51 46 50 V25 L49 31 L56 28 L51 17 L41 12 L36 17 L28 17 Z",
    ],
    details: ["M32 18 V32", "M18 47 H46", "M27 13 L32 18 L37 13"],
    dots: [
      [32, 23, 1.1],
      [32, 28, 1.1],
    ],
  },
  overshirt: {
    body: [
      "M22 12 L12 18 L7 34 L14 37 L17 27 V49 C17 51 18 52 20 52 H44 C46 52 47 51 47 49 V27 L50 37 L57 34 L52 18 L42 12 L37 16 L27 16 Z",
    ],
    details: [
      "M32 16 V52",
      "M24 12 L32 17 L40 12",
      "M21 24 h8 v8 h-8 z",
      "M18 49 H46",
    ],
  },
  kurta: {
    body: [
      "M22 10 L12 16 L7 34 L14 37 L17 27 V57 H29 V52 H35 V57 H47 V27 L50 37 L57 34 L52 16 L42 10 L37 14 L27 14 Z",
    ],
    details: [
      "M32 14 V46",
      "M24 10 L32 15 L40 10",
      "M17 27 L20 27",
      "M44 27 L47 27",
    ],
  },
  bandi: {
    body: [
      "M20 12 L12 17 L10 30 L15 32 L16 27 V50 C16 51 17 52 19 52 H45 C47 52 48 51 48 50 V27 L49 32 L54 30 L52 17 L44 12 L38 16 L26 16 Z",
    ],
    details: ["M32 16 V52", "M24 12 L32 17 L40 12"],
    dots: [
      [32, 24, 1.1],
      [32, 30, 1.1],
      [32, 36, 1.1],
      [32, 42, 1.1],
    ],
  },
  jeans: {
    body: [
      "M19 10 H45 C46 22 46 36 45 50 C45 53 45 56 45 58 H34 C34 48 33 40 32 34 C31 40 30 48 30 58 H19 C19 56 19 53 19 50 C18 36 18 22 19 10 Z",
    ],
    details: [
      "M19 16 C26 19 38 19 45 16",
      "M22 12 C26 16 29 21 30 27",
      "M42 12 C38 16 35 21 34 27",
      "M21 54 H29",
      "M35 54 H43",
    ],
  },
  trouser: {
    body: [
      "M19 10 H45 C45 24 45 40 44 54 H34 C34 44 33 36 32 32 C31 36 30 44 30 54 H20 C19 40 19 24 19 10 Z",
    ],
    details: ["M32 14 V30", "M19 16 C26 19 38 19 45 16", "M21 50 H30", "M34 50 H43"],
  },
  cargo: {
    body: [
      "M18 10 H46 C46 24 46 40 45 54 H34 C34 44 33 36 32 32 C31 36 30 44 30 54 H19 C18 40 18 24 18 10 Z",
    ],
    details: [
      "M18 15 H46",
      "M21 22 h8 v12 h-8 z",
      "M35 22 h8 v12 h-8 z",
      "M21 50 H30",
      "M34 50 H43",
    ],
  },
  shorts: {
    body: [
      "M19 10 H45 C45 20 45 30 44 40 H34 C34 33 33 28 32 26 C31 28 30 33 30 40 H20 C19 30 19 20 19 10 Z",
    ],
    details: ["M19 15 C26 18 38 18 45 15", "M21 36 H30", "M34 36 H43"],
  },
  sneaker: {
    body: [
      "M10 38 C10 33 15 30 21 29 C26 28 29 26 33 24 C37 22 40 23 42 26 C48 28 54 31 56 35 C57 37 57 39 56 41 H11 C10 40 10 39 10 38 Z",
    ],
    details: [
      "M10 41 H56",
      "M11 44 H55",
      "M33 25 L31 36",
      "M40 27 L38 38",
      "M20 31 C24 32 28 32 31 31",
    ],
  },
  loafer: {
    body: [
      "M10 40 C10 35 16 32 23 31 C30 30 35 28 40 28 C47 28 53 32 55 37 C56 39 56 41 55 42 H11 C10 42 10 41 10 40 Z",
    ],
    details: [
      "M10 42 H55",
      "M11 45 H54",
      "M28 31 L45 30",
      "M24 32 C30 34 40 34 46 31",
    ],
  },
  derby: {
    body: [
      "M10 37 C10 32 16 29 23 28 C29 27 33 25 37 24 C42 23 46 26 49 29 C53 31 55 34 55 38 H10 Z",
      "M9 42 H56 C57 45 57 47 56 48 H10 C8 47 8 44 9 42 Z",
    ],
    details: [
      "M9 42 H56",
      "M12 45 H54",
      "M36 26 L34 38",
      "M42 27 L40 38",
      "M20 31 C25 32 30 32 33 31",
    ],
  },
  boot: {
    body: [
      "M22 10 H40 C40 20 40 32 40 42 C44 42 48 42 52 43 C55 44 56 47 55 49 H20 C19 46 19 42 20 38 C21 30 21 20 22 10 Z",
    ],
    details: [
      "M28 12 V40",
      "M40 20 H22",
      "M20 49 H55",
      "M22 45 H54",
      "M22 12 H40",
    ],
  },
  sandal: {
    body: [
      "M12 46 C12 42 20 40 33 40 C45 40 53 42 53 46 C53 49 45 51 33 51 C20 51 12 49 12 46 Z",
    ],
    details: [
      "M16 40 C20 33 27 30 33 30 C39 30 46 33 50 40",
      "M33 30 V40",
      "M23 34 C26 37 30 39 33 40",
      "M43 34 C40 37 36 39 33 40",
    ],
  },
  watch: {
    body: [
      "M28 8 C28 6 30 5 32 5 C34 5 36 6 36 8 V22 H28 Z",
      "M28 42 V56 C28 58 30 59 32 59 C34 59 36 58 36 56 V42 Z",
      "M32 20 A12 12 0 1 0 32 44 A12 12 0 1 0 32 20 Z",
    ],
    details: ["M32 26 V33 H38"],
  },
  belt: {
    body: [
      "M8 30 H50 C54 30 56 32 56 35 C56 38 54 40 50 40 H8 Z",
      "M8 27 H50 C51 27 52 27.5 52 28.5 V29 H8 Z",
    ],
    details: [
      "M13 32 V38",
      "M19 32 V38",
      "M25 32 V38",
      "M31 32 V38",
      "M50 30 V40",
    ],
  },
  glasses: {
    body: [
      "M8 22 H28 C30 22 31 23 31 25 V31 C31 35 28 38 24 38 H15 C11 38 8 35 8 31 Z",
      "M36 22 H56 C58 22 57 35 53 38 H44 C40 38 36 35 36 31 V25 C36 23 38 22 36 22 Z",
    ],
    details: ["M31 25 H36", "M8 24 L4 21", "M56 24 L60 21"],
  },
};

export interface GarmentGlyphProps {
  glyph: GlyphId;
  color: string;
  className?: string;
  label?: string;
}

export function GarmentGlyph({ glyph, color, className, label }: GarmentGlyphProps) {
  const shape = GLYPHS[glyph];
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={label ?? `${glyph} illustration`}
    >
      {shape.body.map((d) => (
        <path
          key={d}
          d={d}
          fill={color}
          stroke={outlineOn(color)}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      ))}
      {(shape.details ?? []).map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={foldStroke(color)}
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      ))}
      {(shape.dots ?? []).map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={foldStroke(color)} />
      ))}
    </svg>
  );
}
