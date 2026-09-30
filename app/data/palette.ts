import type {
  AccentInfo,
  CapsuleResolution,
  FabricEntry,
  FoundationInfo,
  RedundancyResolution,
  Rule,
  SkinTone,
} from "~/lib/types";
import { SKIN } from "./colors";

export const PROFILE = {
  name: "Ankur",
  skinTone: SKIN,
  aesthetic: "Old Money · Quiet Luxury · Royal Heritage",
  festivals: "Navaratri & Durga Puja",
} satisfies {
  name: string;
  skinTone: SkinTone;
  aesthetic: string;
  festivals: string;
};

export const FOUNDATIONS = [
  {
    colorId: "cream",
    label: "Off-White / Cream / Ecru",
    role: "Light base & soft contrast",
    bestFor: ["T-shirts", "Linen overshirts", "Chinos", "Daytime kurtas", "Sneakers"],
  },
  {
    colorId: "olive",
    label: "Olive & Sage Green",
    role: "Earthy anchor",
    bestFor: ["Knit polos", "Canvas overshirts", "Cargos", "Chino shorts", "Silk bandis"],
  },
  {
    colorId: "navy",
    label: "Midnight Navy & Dark Indigo",
    role: "Tailored authority & evening base",
    bestFor: ["Denim jeans", "T-shirts", "Bandhgalas", "Blazers", "Evening kurtas"],
  },
  {
    colorId: "charcoal",
    label: "Charcoal Grey & Washed Black",
    role: "Modern city grounding",
    bestFor: ["Trousers", "Denim", "Evening T-shirts", "Derby shoes"],
  },
] as const satisfies readonly FoundationInfo[];

export const ACCENTS = [
  {
    colorId: "chocolate",
    label: "Chocolate / Coffee Brown",
    effect: "Rich, grounded warmth that makes cream and green look bespoke.",
  },
  {
    colorId: "terracotta",
    label: "Burnt Orange / Terracotta",
    effect:
      "Complementary warmth against blue denim; brings instant festive, artistic flair.",
  },
  {
    colorId: "burgundy",
    label: "Burgundy / Oxblood",
    effect: "Aristocratic depth that enlivens grey and dusty-pink bases.",
  },
  {
    colorId: "powder-blue",
    label: "Powder / Sky Blue",
    effect: "Softens dark trousers and denim; looks fresh under sunlight.",
  },
  {
    colorId: "sage",
    label: "Sage Green / Pistachio",
    effect:
      "Subtle, understated daytime luxury for kurtas, bandis and knit tees.",
  },
] as const satisfies readonly AccentInfo[];

export const REDUNDANCIES = [
  {
    terms: ["Cream", "Off-white", "Ecru", "Beige"],
    consolidated: "Off-White / Cream / Ecru",
    colorId: "cream",
    why: "Stark paper-white creates a harsh, chalky contrast against wheatish skin. Warm off-white illuminates the skin's natural golden undertones.",
  },
  {
    terms: ["Brown", "Coffee", "Chocolate", "Tobacco", "Cognac"],
    consolidated: "Rich Chocolate / Coffee Brown",
    colorId: "chocolate",
    why: "One foundational earth tone that adds deep luxury when paired with cream, sage or navy.",
  },
  {
    terms: ["Olive", "Hunter", "Sage"],
    consolidated: "Olive & Sage Green",
    colorId: "olive",
    why: "Sage is the soft daytime variant; olive / hunter is the deep evening and outerwear variant. Both sit adjacent to warm skin on the colour wheel.",
  },
  {
    terms: ["Navy blue", "Dark indigo", "Jet black"],
    consolidated: "Midnight Navy & Dark Indigo",
    colorId: "navy",
    why: "Replaces stark black. Looks infinitely more expensive, aristocratic and forgiving in natural sunlight.",
  },
  {
    terms: ["Charcoal grey", "Washed black"],
    consolidated: "Charcoal Grey & Washed Black",
    colorId: "charcoal",
    why: "Softens the silhouette compared to jet-black and pairs seamlessly with pastels, earth tones and jewel tones.",
  },
] as const satisfies readonly RedundancyResolution[];

export const FABRICS_APPROVED = [
  {
    name: "100% long-staple cotton",
    why: "220+ GSM heavyweight — holds a crisp shape, breathes in heat.",
  },
  {
    name: "Pure French / Irish flax linen",
    why: "Visible weave, matte texture, gets better with every wash.",
  },
  {
    name: "Handloom khadi (silk & cotton)",
    why: "Irregular hand-spun yarn carries quiet heritage status.",
  },
  {
    name: "Raw matka & tussar silk",
    why: "Matte, textured slubs — festive presence without any shine.",
  },
  {
    name: "Chanderi silk-cotton",
    why: "Feather-light sheen for finale kurtas; breathes through puja days.",
  },
  {
    name: "Pure pashmina / cashmere",
    why: "For draped winter layers — warmth that reads as heirloom.",
  },
  {
    name: "Raw denim (100% cotton)",
    why: "Fades uniquely to you; no distressing, no artificial wear.",
  },
  {
    name: "Full-grain leather & calf suede",
    why: "Ages into patina; the only shoe materials in the capsule.",
  },
] as const satisfies readonly FabricEntry[];

export const FABRICS_AVOID = [
  {
    name: "Polyester & polyester blends",
    why: "Shiny, sweaty, and instantly cheapens natural cotton and linen.",
  },
  {
    name: "Nylon & acrylic knitwear",
    why: "Pills, shines, and never drapes like wool or cotton knit.",
  },
  {
    name: "Shiny synthetic art-silk",
    why: "Cannot replicate the organic matte slub of real tussar or matka.",
  },
  {
    name: "Plastic sequins, glitter, glued stones",
    why: "Loud shine fights the quiet-luxury palette and sheds thread.",
  },
  {
    name: "Spray-on skinny fits & low-rise pants",
    why: "Destroys drape and proportion; the opposite of relaxed tailoring.",
  },
  {
    name: "Loud visible logos & monograms",
    why: "Branding announces price; cut, fabric and colour announce taste.",
  },
] as const satisfies readonly FabricEntry[];

export const RESOLUTIONS = [
  {
    id: "r-tees",
    raw: "2 plain t-shirts — black + white",
    refined: "Off-white / cream tee + washed black / charcoal tee",
    verdict: "consolidated",
    reason:
      "Stark white turns chalky on wheatish skin — folded into warm cream. Jet black softens into washed black and charcoal, which frame the face more gently.",
  },
  {
    id: "r-shorts",
    raw: "4 solid shorts — white, light blue, olive, brown",
    refined: "3 tailored shorts — off-white, olive, coffee brown",
    verdict: "consolidated",
    reason:
      "Light blue duplicated the denim palette and was dropped. White deepened to off-white, brown consolidated to coffee. Cut refitted to 6–7″ above the knee.",
  },
  {
    id: "r-jeans",
    raw: "4 jeans — light blue, dark blue, black, charcoal",
    refined: "Mid-wash blue · dark indigo raw selvedge · charcoal / washed black",
    verdict: "consolidated",
    reason:
      "Light blue merged into mid-wash; black and charcoal were near-duplicates, so one charcoal / washed-black pair survives. Straight and straight-taper cuts, no distressing.",
  },
  {
    id: "r-polos",
    raw: "2 polo t-shirts — olive, brown",
    refined: "Olive knit polo + coffee brown knit polo",
    verdict: "refined",
    reason:
      "Both colours kept; the cut upgraded to a Johnny-collar knit with ribbed cuffs — knit reads far more expensive than standard piqué.",
  },
  {
    id: "r-cargos",
    raw: "2 cargos — beige, olive",
    refined: "Beige + olive cargos, flat streamlined pockets",
    verdict: "refined",
    reason:
      "Both kept as earthy anchors; refined to flat, tailored pockets — no bulging tactical pouches breaking the silhouette.",
  },
  {
    id: "r-formals",
    raw: "2 formal pants — beige, black",
    refined: "Beige / sand pleated trousers + black / charcoal double-reverse-pleat trousers",
    verdict: "refined",
    reason:
      "Upgraded to high-rise pleats and a 0-break hem. Beige doubles as the summer trouser; the black pair grounds evening fits.",
  },
  {
    id: "r-shoes",
    raw: "4 shoes — white sneaker, chunky shoes, loafer, boots",
    refined: "Court sneaker · chunky derby · suede loafer · Chelsea boot",
    verdict: "refined",
    reason:
      "All four roles kept and sharpened: full-grain leather court sneaker, lug-sole derby, chocolate suede loafer, Chelsea boot — every pair works with the leather-match rule.",
  },
  {
    id: "r-watches",
    raw: "2 watches — minimal, analog",
    refined: "Vintage gold dress watch + minimal steel everyday watch",
    verdict: "refined",
    reason:
      "The vintage gold / brass case was added deliberately: warm metal mirrors the golden undertone in your skin, and it carries the ethnic evening fits.",
  },
  {
    id: "r-overshirts",
    raw: "— nothing in the original list",
    refined: "Cream linen · light blue chambray · hunter chore overshirt",
    verdict: "added",
    reason:
      "The layering system was the one thing missing. A cream overshirt over basic blue, black or brown is the single fastest route to the Old Money look.",
  },
] as const satisfies readonly CapsuleResolution[];

export const RULES = [
  {
    id: "fibre",
    title: "The Fibre Rule",
    short: "Natural fibres only.",
    detail:
      "Never wear polyester or synthetic art-silks. Natural cotton, linen, khadi and raw silk carry an organic matte texture and natural slubs that synthetics can never replicate.",
  },
  {
    id: "collar",
    title: "The Collar Rule",
    short: "Mandarin collars must sit clean.",
    detail:
      "The band / mandarin collar rests cleanly around the neck — never gaping open, never choking. A clean collar line frames the face on brown skin.",
  },
  {
    id: "break",
    title: "The 0-Break Rule",
    short: "Bottoms never puddle.",
    detail:
      "Trousers, chinos and pajamas break at 0 or a very slight break. Bottoms should never puddle or drag on the ground — it collapses the whole silhouette.",
  },
  {
    id: "leather",
    title: "The Leather-Match Rule",
    short: "Watch, belt and shoes share one warmth.",
    detail:
      "Watch strap, belt and footwear must match in warmth — all rich dark brown, or all warm cognac. Never mix black leather shoes with a brown watch strap.",
  },
  {
    id: "undershirt",
    title: "The Undershirt Law",
    short: "Ribbed cotton under everything light.",
    detail:
      "Always wear a seamless ribbed 100% breathable cotton sleeveless undershirt beneath light-coloured linen shirts and kurtas — it prevents sweat marks and preserves the drape.",
  },
] as const satisfies readonly Rule[];
