export type GarmentLine = "western" | "ethnic";

export type OccasionTag =
  | "casual"
  | "weekend"
  | "smart-casual"
  | "date-night"
  | "evening"
  | "creative"
  | "summer"
  | "festive"
  | "garba"
  | "pandal"
  | "finale";

export const OCCASION_LABELS: Record<OccasionTag, string> = {
  casual: "Casual everyday",
  weekend: "Weekend",
  "smart-casual": "Smart casual",
  "date-night": "Date night",
  evening: "Evening",
  creative: "Creative",
  summer: "Summer heat",
  festive: "Festive",
  garba: "Garba night",
  pandal: "Pandal hopping",
  finale: "Grand finale",
};

export type ColorFamily =
  | "neutral-light"
  | "neutral-dark"
  | "green"
  | "blue"
  | "brown"
  | "warm"
  | "jewel"
  | "pink"
  | "metal";

export type ColorDepth = "light" | "mid" | "dark";

export interface ColorToken {
  id: string;
  name: string;
  hex: string;
  family: ColorFamily;
  depth: ColorDepth;
  roles: readonly ("foundation" | "accent" | "supporting")[];
  /** Why this tone flatters warm medium-brown skin (from the brief). */
  skinNote?: string;
}

export interface SkinTone {
  id: string;
  name: string;
  undertone: string;
  hex: string;
  shadowHex: string;
  highlightHex: string;
  hairHex: string;
}

export type FabricId =
  | "cotton"
  | "linen"
  | "denim"
  | "twill"
  | "khadi"
  | "silk"
  | "suede"
  | "leather"
  | "wool";

export type TopStyle = "tee" | "polo" | "grandad" | "kurta";

export type BottomStyle =
  | "jeans"
  | "trouser"
  | "pleated"
  | "cargo"
  | "shorts"
  | "pajama"
  | "churidar"
  | "gurkha";

export type LayerStyle = "overshirt" | "chore" | "bandi" | "stole";

export type FootwearStyle =
  | "sneaker"
  | "loafer"
  | "derby"
  | "boot"
  | "sandal"
  | "kolhapuri";

export type WatchStyle = "vintage" | "steel" | "none";

export interface FigurePiece<S extends string> {
  style: S;
  color: string;
  fabric: FabricId;
}

export interface FigureConfig {
  line: GarmentLine;
  top: FigurePiece<TopStyle> | null;
  bottom: FigurePiece<BottomStyle>;
  layer: FigurePiece<LayerStyle> | null;
  footwear: FigurePiece<FootwearStyle>;
  watch: WatchStyle;
  sunglasses: boolean;
  pocketSquare: string | null;
}

export type GlyphId =
  | "tee"
  | "polo"
  | "overshirt"
  | "kurta"
  | "bandi"
  | "jeans"
  | "trouser"
  | "cargo"
  | "shorts"
  | "sneaker"
  | "loafer"
  | "derby"
  | "boot"
  | "sandal"
  | "watch"
  | "belt"
  | "glasses";

export type WardrobeCategory =
  | "tops"
  | "layers"
  | "bottoms"
  | "footwear"
  | "accessories";

export interface WardrobeItem {
  id: string;
  name: string;
  category: WardrobeCategory;
  line: GarmentLine;
  colorIds: readonly string[];
  fabric: string;
  fabricId: FabricId;
  fit: string;
  role?: string;
  occasions: readonly OccasionTag[];
  glyph: GlyphId;
  /** The figure style this item renders as. */
  figureStyle?: TopStyle | BottomStyle | LayerStyle | FootwearStyle;
  note?: string;
}

export interface ComboSlot {
  label: string;
  detail?: string;
  itemId?: string;
  colorId: string;
  alternate?: string;
}

export interface OutfitCombo {
  id: string;
  line: GarmentLine;
  name: string;
  vibe: string;
  occasions: readonly OccasionTag[];
  top: ComboSlot;
  bottom: ComboSlot;
  layer: ComboSlot | null;
  footwear: ComboSlot;
  accessories: ComboSlot | null;
  why: string;
  figure: FigureConfig;
}

export interface FoundationInfo {
  colorId: string;
  label: string;
  role: string;
  bestFor: readonly string[];
}

export interface AccentInfo {
  colorId: string;
  label: string;
  effect: string;
}

export interface RedundancyResolution {
  terms: readonly string[];
  consolidated: string;
  colorId: string;
  why: string;
}

export interface CapsuleResolution {
  id: string;
  raw: string;
  refined: string;
  verdict: "kept" | "refined" | "consolidated" | "added";
  reason: string;
}

export interface FabricEntry {
  name: string;
  why: string;
}

export interface Rule {
  id: string;
  title: string;
  short: string;
  detail: string;
}

export type CheckStatus = "pass" | "warn" | "fail";

export interface CompatibilityCheck {
  id: string;
  label: string;
  status: CheckStatus;
  message: string;
}

export interface CompatibilityResult {
  score: number;
  grade: string;
  gradeNote: string;
  checks: readonly CompatibilityCheck[];
  notes: readonly string[];
}
