export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : clean;
  const value = Number.parseInt(full, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

/** WCAG relative luminance, 0 (black) → 1 (white). */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function isLight(hex: string): boolean {
  return relativeLuminance(hex) > 0.45;
}

/** Ink that stays readable on a given swatch. */
export function inkOn(hex: string): string {
  return isLight(hex) ? "#2b241a" : "#f7f2e9";
}

/** Drape-fold line colour: dark lines on light cloth, light sheen on dark cloth. */
export function foldStroke(hex: string): string {
  return isLight(hex) ? "rgba(43, 36, 26, 0.16)" : "rgba(255, 250, 238, 0.22)";
}

/** Garment outline colour. */
export function outlineOn(hex: string): string {
  return isLight(hex) ? "rgba(43, 36, 26, 0.28)" : "rgba(15, 12, 8, 0.55)";
}
