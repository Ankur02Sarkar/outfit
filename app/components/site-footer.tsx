import { Link } from "react-router";

import { ALL_ITEMS } from "~/data/wardrobe";
import { ALL_COMBOS } from "~/data/combos";
import { RULES } from "~/data/palette";

const NAV_ITEMS = [
  { to: "/wardrobe", label: "Wardrobe" },
  { to: "/combos", label: "Outfit combos" },
  { to: "/builder", label: "Outfit builder" },
  { to: "/system", label: "The system" },
] as const;

export function SiteFooter() {
  const leatherRule = RULES.find((rule) => rule.id === "leather");
  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div className="space-y-3">
          <p className="font-display text-sm font-semibold tracking-[0.24em] uppercase">
            The Capsule
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {ALL_ITEMS.length} curated pieces, {ALL_COMBOS.length} heirloom
            combinations, one warm medium-brown skin tone — a quiet-luxury
            wardrobe built on colour theory and fabric truth.
          </p>
        </div>

        <nav className="space-y-2.5">
          <p className="label-caps text-muted-foreground">Explore</p>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3">
          <p className="label-caps text-muted-foreground">House rule № 4</p>
          {leatherRule ? (
            <>
              <p className="text-sm font-medium">{leatherRule.title}</p>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {leatherRule.detail}
              </p>
            </>
          ) : null}
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-[11px] tracking-[0.14em] text-muted-foreground uppercase md:flex-row md:items-center md:justify-between md:px-8">
          <span>Ankur · The Capsule</span>
          <span>Natural fibres only — polyester never enters this closet</span>
        </div>
      </div>
    </footer>
  );
}
