import { color, hexOf, shortNameOf } from "~/data/colors";
import { ALL_ITEMS, getItem } from "~/data/wardrobe";
import type {
  BottomStyle,
  CheckStatus,
  CompatibilityCheck,
  CompatibilityResult,
  FigureConfig,
  FootwearStyle,
  GarmentLine,
  LayerStyle,
  OccasionTag,
  OutfitCombo,
  TopStyle,
  WatchStyle,
  WardrobeItem,
} from "./types";
import { relativeLuminance } from "./color";

export type BuilderOccasion = "casual" | "smart" | "evening" | "festive";

export const BUILDER_OCCASIONS: Record<
  BuilderOccasion,
  { label: string; tags: readonly OccasionTag[] }
> = {
  casual: { label: "Casual", tags: ["casual", "weekend", "summer"] },
  smart: { label: "Smart", tags: ["smart-casual", "creative", "date-night"] },
  evening: { label: "Evening", tags: ["evening", "date-night", "festive"] },
  festive: { label: "Festive", tags: ["festive", "garba", "pandal", "finale"] },
};

export interface BuilderSlotOption {
  item: WardrobeItem;
}

export interface BuilderSelection {
  line: GarmentLine;
  topId: string;
  bottomId: string;
  layerId: string | null;
  footwearId: string;
  watch: WatchStyle;
  belt: boolean;
  sunglasses: boolean;
  occasion: BuilderOccasion;
}

export function optionsForLine(
  line: GarmentLine,
  category: WardrobeItem["category"],
): readonly WardrobeItem[] {
  return ALL_ITEMS.filter(
    (item) => item.line === line && item.category === category,
  );
}

export const DEFAULT_SELECTION: Record<GarmentLine, BuilderSelection> = {
  western: {
    line: "western",
    topId: "top-tee-washed-black",
    bottomId: "bottom-jeans-midwash",
    layerId: "layer-overshirt-cream",
    footwearId: "shoe-sneaker-cream",
    watch: "steel",
    belt: true,
    sunglasses: false,
    occasion: "casual",
  },
  ethnic: {
    line: "ethnic",
    topId: "etop-kurta-ivory",
    bottomId: "ebottom-pajama-cream",
    layerId: "elayer-bandi-sage",
    footwearId: "eshoe-peshawari-cognac",
    watch: "vintage",
    belt: false,
    sunglasses: false,
    occasion: "festive",
  },
};

function pickForSlot(
  line: GarmentLine,
  category: WardrobeItem["category"],
  preferredStyle: string | undefined,
  preferredColorId: string | undefined,
  fallback: BuilderSelection["topId"],
): string {
  const candidates = optionsForLine(line, category);
  if (candidates.length === 0) return fallback;
  const scored = candidates
    .map((item) => {
      let score = 0;
      if (preferredStyle && item.figureStyle === preferredStyle) score += 4;
      if (preferredColorId && item.colorIds.includes(preferredColorId)) score += 6;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score);
  const best = scored[0];
  return best && best.score > 0 ? best.item.id : (candidates[0]?.id ?? fallback);
}

function occasionForCombo(combo: OutfitCombo): BuilderOccasion {
  const tags = combo.occasions;
  if (combo.line === "ethnic") return "festive";
  if (tags.includes("evening") || tags.includes("date-night")) return "evening";
  if (tags.includes("smart-casual") || tags.includes("creative")) return "smart";
  return "casual";
}

/** Load a curated combination into the builder selection. */
export function selectionFromCombo(combo: OutfitCombo): BuilderSelection {
  const line = combo.line;
  const fallback = DEFAULT_SELECTION[line];
  return {
    line,
    topId: pickForSlot(
      line,
      "tops",
      combo.figure.top?.style,
      combo.top.colorId,
      fallback.topId,
    ),
    bottomId: pickForSlot(
      line,
      "bottoms",
      combo.figure.bottom.style,
      combo.bottom.colorId,
      fallback.bottomId,
    ),
    layerId: combo.layer
      ? pickForSlot(
          line,
          "layers",
          combo.figure.layer?.style,
          combo.layer.colorId,
          fallback.layerId ?? "",
        )
      : null,
    footwearId: pickForSlot(
      line,
      "footwear",
      combo.figure.footwear.style,
      combo.footwear.colorId,
      fallback.footwearId,
    ),
    watch: combo.figure.watch,
    belt: combo.accessories?.label.toLowerCase().includes("belt") ?? false,
    sunglasses: combo.figure.sunglasses,
    occasion: occasionForCombo(combo),
  };
}

export function buildFigure(selection: BuilderSelection): FigureConfig {
  const top = getItem(selection.topId);
  const bottom = getItem(selection.bottomId);
  const layer = selection.layerId ? getItem(selection.layerId) : null;
  const footwear = getItem(selection.footwearId);

  return {
    line: selection.line,
    top:
      top.figureStyle && isTopStyle(top.figureStyle)
        ? {
            style: top.figureStyle,
            color: hexOf(top.colorIds[0] ?? "cream"),
            fabric: top.fabricId,
          }
        : null,
    bottom: {
      style:
        bottom.figureStyle && isBottomStyle(bottom.figureStyle)
          ? bottom.figureStyle
          : "trouser",
      color: hexOf(bottom.colorIds[0] ?? "charcoal"),
      fabric: bottom.fabricId,
    },
    layer:
      layer && layer.figureStyle && isLayerStyle(layer.figureStyle)
        ? {
            style: layer.figureStyle,
            color: hexOf(layer.colorIds[0] ?? "cream"),
            fabric: layer.fabricId,
          }
        : null,
    footwear: {
      style:
        footwear.figureStyle && isFootwearStyle(footwear.figureStyle)
          ? footwear.figureStyle
          : "sneaker",
      color: hexOf(footwear.colorIds[0] ?? "espresso"),
      fabric: footwear.fabricId,
    },
    watch: selection.watch,
    sunglasses: selection.sunglasses,
    pocketSquare: null,
  };
}

function isTopStyle(value: string): value is TopStyle {
  return ["tee", "polo", "grandad", "kurta"].includes(value);
}

function isBottomStyle(value: string): value is BottomStyle {
  return [
    "jeans",
    "trouser",
    "pleated",
    "cargo",
    "shorts",
    "pajama",
    "churidar",
    "gurkha",
  ].includes(value);
}

function isLayerStyle(value: string): value is LayerStyle {
  return ["overshirt", "chore", "bandi", "stole"].includes(value);
}

function isFootwearStyle(value: string): value is FootwearStyle {
  return ["sneaker", "loafer", "derby", "boot", "sandal", "kolhapuri"].includes(
    value,
  );
}

// ————————————————————————— Evaluation —————————————————————————

const BROWN_FAMILY = new Set(["brown"]);
const LEATHER_EXEMPT = new Set(["white-warm", "cream"]);
const WARM_AFFINITY = new Set([
  "cream",
  "ivory",
  "ecru",
  "butter",
  "olive",
  "sage",
  "chocolate",
  "coffee",
  "terracotta",
  "rust",
  "ochre",
  "cognac",
  "espresso",
  "tortoise",
  "beige",
  "oatmeal",
]);
const BLUE_FAMILY = new Set(["blue"]);
const WARM_FAMILY = new Set(["warm", "pink"]);

interface Piece {
  item: WardrobeItem;
  colorId: string;
}

function pieces(selection: BuilderSelection): readonly Piece[] {
  const result: Piece[] = [
    { item: getItem(selection.topId), colorId: getItem(selection.topId).colorIds[0] ?? "cream" },
    {
      item: getItem(selection.bottomId),
      colorId: getItem(selection.bottomId).colorIds[0] ?? "charcoal",
    },
    {
      item: getItem(selection.footwearId),
      colorId: getItem(selection.footwearId).colorIds[0] ?? "espresso",
    },
  ];
  if (selection.layerId) {
    const layer = getItem(selection.layerId);
    result.push({ item: layer, colorId: layer.colorIds[0] ?? "cream" });
  }
  return result;
}

export function evaluateOutfit(
  selection: BuilderSelection,
): CompatibilityResult {
  const chosen = pieces(selection);
  const checks: CompatibilityCheck[] = [];
  const notes: string[] = [];

  // 1 — Colour harmony & accent discipline
  const accentColors = chosen
    .map((p) => color(p.colorId))
    .filter((c) => c.roles.includes("accent") && c.family !== "brown");
  const accentFamilies = [...new Set(accentColors.map((c) => c.family))];
  if (accentFamilies.length === 0) {
    const earths = chosen.filter((p) =>
      ["brown", "green"].includes(color(p.colorId).family),
    );
    checks.push({
      id: "harmony",
      label: "Colour harmony",
      status: "pass",
      message:
        earths.length > 0
          ? "Grounded earth palette — the safest kind of expensive."
          : "A disciplined neutral palette — impossible to get wrong.",
    });
  } else if (accentFamilies.length === 1) {
    const accentName = shortNameOf(accentColors[0]?.id ?? "");
    checks.push({
      id: "harmony",
      label: "Colour harmony",
      status: "pass",
      message: `One accent colour (${accentName}) against a neutral base — disciplined layering.`,
    });
  } else if (
    accentFamilies.every((family) => BLUE_FAMILY.has(family)) ||
    accentFamilies.every((family) => WARM_FAMILY.has(family))
  ) {
    checks.push({
      id: "harmony",
      label: "Colour harmony",
      status: "pass",
      message: "Tonal family layering — same hue family, different depth.",
    });
  } else if (
    accentFamilies.some((family) => BLUE_FAMILY.has(family)) &&
    accentFamilies.some((family) => WARM_FAMILY.has(family))
  ) {
    checks.push({
      id: "harmony",
      label: "Colour harmony",
      status: "pass",
      message: "Blue against burnt orange — direct complements on the colour wheel.",
    });
    notes.push(
      "Blue and burnt orange are direct complements — deliberate, sophisticated colour mastery.",
    );
  } else {
    checks.push({
      id: "harmony",
      label: "Colour harmony",
      status: "warn",
      message: "Two competing accents — let one of them rest.",
    });
  }

  // 2 — Light / dark contrast
  const luminances = chosen.map((p) => relativeLuminance(color(p.colorId).hex));
  const spread = Math.max(...luminances) - Math.min(...luminances);
  if (spread < 0.1) {
    checks.push({
      id: "contrast",
      label: "Contrast balance",
      status: "warn",
      message: "Reads as one flat block — lift it with a lighter or deeper tone.",
    });
  } else if (spread < 0.2) {
    checks.push({
      id: "contrast",
      label: "Contrast balance",
      status: "pass",
      message: "Soft tonal range — easy, understated depth.",
    });
  } else {
    checks.push({
      id: "contrast",
      label: "Contrast balance",
      status: "pass",
      message: "Clear light-to-dark range — dimension that keeps skin glowing.",
    });
  }

  const layerPiece = chosen.find((p) => p.item.category === "layers");
  const topPiece = chosen.find((p) => p.item.category === "tops");
  if (layerPiece && topPiece) {
    const delta = Math.abs(
      relativeLuminance(color(layerPiece.colorId).hex) -
        relativeLuminance(color(topPiece.colorId).hex),
    );
    if (delta >= 0.25) {
      notes.push(
        `${shortNameOf(layerPiece.colorId)} over ${shortNameOf(topPiece.colorId).toLowerCase()} brightens the fit and keeps the base tones from washing out medium skin.`,
      );
    }
  }

  // 3 — Leather-match rule
  const footwear = chosen.find((p) => p.item.category === "footwear");
  if (footwear) {
    const shoeColor = color(footwear.colorId);
    if (LEATHER_EXEMPT.has(shoeColor.id)) {
      checks.push({
        id: "leather",
        label: "Leather match",
        status: "pass",
        message:
          selection.watch === "steel"
            ? "Clean sneakers + steel case — nothing for the leather rule to trip on."
            : "Clean sneakers sit outside the leather rule; a brown-strap watch adds warmth.",
      });
    } else if (BROWN_FAMILY.has(shoeColor.family)) {
      const watchNote =
        selection.watch === "steel"
          ? "Steel case is metal — exempt from the rule."
          : selection.watch === "vintage"
            ? "Gold case on brown leather sits in the same warm family."
            : "No leather on the wrist to clash.";
      checks.push({
        id: "leather",
        label: "Leather match",
        status: "pass",
        message: `Shoes in the rich brown family. ${watchNote}`,
      });
      notes.push(
        "Watch, belt and shoes share one warm leather family — the quietest luxury signal there is.",
      );
    } else {
      checks.push({
        id: "leather",
        label: "Leather match",
        status: "warn",
        message: "Check that belt and watch warmth match these shoes.",
      });
    }
  }

  // 4 — Occasion fit
  const wanted = BUILDER_OCCASIONS[selection.occasion].tags;
  const matched = chosen.filter((p) =>
    p.item.occasions.some((tag) => wanted.includes(tag)),
  );
  if (matched.length === chosen.length) {
    checks.push({
      id: "occasion",
      label: `Occasion fit — ${BUILDER_OCCASIONS[selection.occasion].label}`,
      status: "pass",
      message: "Every piece was curated for this moment.",
    });
  } else if (matched.length >= Math.max(2, chosen.length - 1)) {
    checks.push({
      id: "occasion",
      label: `Occasion fit — ${BUILDER_OCCASIONS[selection.occasion].label}`,
      status: "pass",
      message: "Mostly on-occasion — at most one piece is a stretch.",
    });
  } else {
    checks.push({
      id: "occasion",
      label: `Occasion fit — ${BUILDER_OCCASIONS[selection.occasion].label}`,
      status: "warn",
      message: `Only ${matched.length} of ${chosen.length} pieces suit this occasion.`,
    });
  }

  // 5 — Warm-undertone synergy
  const warmHits = chosen.filter((p) => WARM_AFFINITY.has(p.colorId));
  if (warmHits.length > 0) {
    checks.push({
      id: "skin",
      label: "Skin-tone synergy",
      status: "pass",
      message: `${warmHits.length} piece${warmHits.length > 1 ? "s" : ""} ${warmHits.length > 1 ? "pick" : "picks"} up the golden undertone in your skin.`,
    });
  } else {
    checks.push({
      id: "skin",
      label: "Skin-tone synergy",
      status: "warn",
      message: "Nothing here speaks to your warm undertone — add cream, olive or brown.",
    });
  }

  // Earth-triad signature note
  const colorIds = new Set(chosen.map((p) => p.colorId));
  const earthTriad =
    (colorIds.has("sage") || colorIds.has("olive")) &&
    (colorIds.has("cream") || colorIds.has("ivory") || colorIds.has("ecru")) &&
    (colorIds.has("chocolate") || colorIds.has("coffee"));
  if (earthTriad) {
    notes.push(
      "Sage + cream + chocolate is the single most luxurious earthy triad on brown skin.",
    );
  }

  if (selection.line === "ethnic") {
    if (["sandal", "kolhapuri"].includes(footwear?.item.figureStyle ?? "")) {
      notes.push(
        "Slip-on footwear — effortless entry and exit at temple pandals.",
      );
    }
    const kurta = chosen.find((p) => p.item.figureStyle === "kurta");
    if (kurta) {
      notes.push(
        "Matte slub textures read festive without a single synthetic shine.",
      );
    }
  }

  const penalty = checks.reduce((total, check) => {
    if (check.status === "fail") return total + 25;
    if (check.status === "warn") return total + 12;
    return total;
  }, 0);
  const score = Math.max(10, 100 - penalty);
  const grade =
    score >= 92
      ? "Heirloom"
      : score >= 78
        ? "Bespoke"
        : score >= 62
          ? "Considered"
          : "Rethink";
  const gradeNote =
    score >= 92
      ? "This is the level the whole capsule was built for."
      : score >= 78
        ? "Sharp, deliberate and wearable as-is."
        : score >= 62
          ? "Solid — one small adjustment from excellent."
          : "Something in here is fighting the brief.";

  return { score, grade, gradeNote, checks, notes: notes.slice(0, 4) };
}

export function statusWeight(status: CheckStatus): number {
  return status === "pass" ? 0 : status === "warn" ? 1 : 2;
}
