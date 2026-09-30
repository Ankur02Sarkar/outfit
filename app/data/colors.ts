import type { ColorToken, SkinTone } from "~/lib/types";

export const SKIN: SkinTone = {
  id: "medium-brown",
  name: "Medium Brown",
  undertone: "Warm Golden / Olive / Caramel",
  hex: "#b07a55",
  shadowHex: "#8e5f3d",
  highlightHex: "#c98f66",
  hairHex: "#2a2119",
};

export const COLORS = [
  // ——— Core four foundations ———
  {
    id: "cream",
    name: "Off-White / Cream / Ecru",
    hex: "#f1e8d6",
    family: "neutral-light",
    depth: "light",
    roles: ["foundation"],
    skinNote:
      "Warm off-white illuminates golden undertones — stark paper-white would look chalky against wheatish skin.",
  },
  {
    id: "olive",
    name: "Olive Green",
    hex: "#5a6142",
    family: "green",
    depth: "mid",
    roles: ["foundation"],
    skinNote:
      "Sits adjacent to warm skin on the colour wheel — effortless organic elegance.",
  },
  {
    id: "navy",
    name: "Midnight Navy",
    hex: "#1e2942",
    family: "blue",
    depth: "dark",
    roles: ["foundation"],
    skinNote:
      "Replaces stark black: aristocratic, forgiving in sunlight, richer in person.",
  },
  {
    id: "charcoal",
    name: "Charcoal Grey / Washed Black",
    hex: "#3b3a36",
    family: "neutral-dark",
    depth: "dark",
    roles: ["foundation"],
    skinNote:
      "Softens the silhouette versus jet-black and pairs with pastel, earth and jewel tones.",
  },

  // ——— Layering power accents ———
  {
    id: "chocolate",
    name: "Chocolate / Coffee Brown",
    hex: "#4a342a",
    family: "brown",
    depth: "dark",
    roles: ["accent", "supporting"],
    skinNote: "Grounded warmth that makes cream and green look bespoke.",
  },
  {
    id: "terracotta",
    name: "Burnt Orange / Terracotta",
    hex: "#b85c33",
    family: "warm",
    depth: "mid",
    roles: ["accent"],
    skinNote:
      "Complementary warmth against blue denim — instant festive, artistic flair.",
  },
  {
    id: "burgundy",
    name: "Burgundy / Oxblood",
    hex: "#66232e",
    family: "jewel",
    depth: "dark",
    roles: ["accent"],
    skinNote:
      "Aristocratic depth that enlivens grey and dusty-pink bases.",
  },
  {
    id: "powder-blue",
    name: "Powder / Sky Blue",
    hex: "#a9c1dc",
    family: "blue",
    depth: "light",
    roles: ["accent"],
    skinNote: "Softens dark trousers and denim; looks fresh under sunlight.",
  },
  {
    id: "sage",
    name: "Sage Green / Pistachio",
    hex: "#9daa88",
    family: "green",
    depth: "light",
    roles: ["accent"],
    skinNote:
      "Understated daytime luxury for kurtas, bandis and knit tees.",
  },

  // ——— Supporting tones that appear across the combos ———
  {
    id: "ivory",
    name: "Ivory",
    hex: "#f6f1e4",
    family: "neutral-light",
    depth: "light",
    roles: ["supporting"],
  },
  {
    id: "ecru",
    name: "Ecru",
    hex: "#ebe0c8",
    family: "neutral-light",
    depth: "light",
    roles: ["supporting"],
  },
  {
    id: "white-warm",
    name: "Warm White",
    hex: "#f8f6f1",
    family: "neutral-light",
    depth: "light",
    roles: ["supporting"],
  },
  {
    id: "butter",
    name: "Butter Cream",
    hex: "#f3e6c4",
    family: "neutral-light",
    depth: "light",
    roles: ["supporting"],
  },
  {
    id: "hunter",
    name: "Hunter Green",
    hex: "#3d4a31",
    family: "green",
    depth: "dark",
    roles: ["supporting"],
  },
  {
    id: "indigo",
    name: "Dark Indigo",
    hex: "#2a3854",
    family: "blue",
    depth: "dark",
    roles: ["supporting"],
  },
  {
    id: "washed-black",
    name: "Washed Black",
    hex: "#2a2925",
    family: "neutral-dark",
    depth: "dark",
    roles: ["supporting"],
  },
  {
    id: "coffee",
    name: "Coffee Brown",
    hex: "#5c4435",
    family: "brown",
    depth: "mid",
    roles: ["supporting"],
  },
  {
    id: "rust",
    name: "Rich Rust",
    hex: "#a8512f",
    family: "warm",
    depth: "mid",
    roles: ["supporting"],
  },
  {
    id: "light-blue",
    name: "Light Blue / Chambray",
    hex: "#8ca6c2",
    family: "blue",
    depth: "mid",
    roles: ["supporting"],
  },
  {
    id: "mid-blue-denim",
    name: "Mid-Wash Denim Blue",
    hex: "#5b7b9a",
    family: "blue",
    depth: "mid",
    roles: ["supporting"],
  },
  {
    id: "dusty-pink",
    name: "Dusty Pink",
    hex: "#c79b97",
    family: "pink",
    depth: "light",
    roles: ["supporting"],
  },
  {
    id: "beige",
    name: "Beige / Sand",
    hex: "#d6c4a2",
    family: "neutral-light",
    depth: "light",
    roles: ["supporting"],
  },
  {
    id: "oatmeal",
    name: "Oatmeal",
    hex: "#d9cdb0",
    family: "neutral-light",
    depth: "light",
    roles: ["supporting"],
  },
  {
    id: "ochre",
    name: "Warm Ochre / Antique Gold",
    hex: "#be8a33",
    family: "warm",
    depth: "mid",
    roles: ["supporting"],
  },
  {
    id: "cognac",
    name: "Tan / Cognac Leather",
    hex: "#a0713f",
    family: "brown",
    depth: "mid",
    roles: ["supporting"],
  },
  {
    id: "espresso",
    name: "Deep Espresso",
    hex: "#3e2c22",
    family: "brown",
    depth: "dark",
    roles: ["supporting"],
  },
  {
    id: "brass",
    name: "Antique Brass / Gold",
    hex: "#b08d57",
    family: "metal",
    depth: "mid",
    roles: ["supporting"],
  },
  {
    id: "steel",
    name: "Brushed Steel",
    hex: "#b9bdc1",
    family: "metal",
    depth: "light",
    roles: ["supporting"],
  },
  {
    id: "tortoise",
    name: "Tortoiseshell",
    hex: "#6e4a2a",
    family: "brown",
    depth: "mid",
    roles: ["supporting"],
  },
] as const satisfies readonly ColorToken[];

export type ColorId = (typeof COLORS)[number]["id"];

const COLOR_INDEX: ReadonlyMap<string, ColorToken> = new Map(
  COLORS.map((c) => [c.id, c]),
);

export function color(id: ColorId | string): ColorToken {
  const token = COLOR_INDEX.get(id);
  if (!token) {
    throw new Error(`Unknown colour id: ${id}`);
  }
  return token;
}

export function hexOf(id: ColorId | string): string {
  return color(id).hex;
}

export function nameOf(id: ColorId | string): string {
  return color(id).name;
}

/** First segment of a slashed name, e.g. "Off-White / Cream / Ecru" → "Off-White". */
export function shortNameOf(id: ColorId | string): string {
  const segments = nameOf(id).split(" / ");
  return segments[0] ?? nameOf(id);
}
