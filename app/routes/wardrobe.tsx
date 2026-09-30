import { useMemo, useState } from "react";

import { EthnicPhilosophy } from "~/components/ethnic-philosophy";
import { GarmentGlyph } from "~/components/figure/garment-glyph";
import { PageIntro, SectionHeading } from "~/components/section-heading";
import { SwatchRow } from "~/components/swatch";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { hexOf } from "~/data/colors";
import { RESOLUTIONS } from "~/data/palette";
import { CAPSULE_ITEMS, CATEGORY_LABELS, ETHNIC_ITEMS } from "~/data/wardrobe";
import { OCCASION_LABELS } from "~/lib/types";
import { cn } from "~/lib/utils";
import type {
  CapsuleResolution,
  WardrobeCategory,
  WardrobeItem,
} from "~/lib/types";

import type { Route } from "./+types/wardrobe";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wardrobe · The Capsule" },
    {
      name: "description",
      content:
        "The full capsule: every piece, fabric, fit and colourway — plus how the original list was refined into this wardrobe.",
    },
  ];
}

const CATEGORIES: readonly (WardrobeCategory | "all")[] = [
  "all",
  "tops",
  "layers",
  "bottoms",
  "footwear",
  "accessories",
];

const VERDICT_STYLES: Record<CapsuleResolution["verdict"], string> = {
  kept: "border-olive/40 bg-olive/10 text-olive",
  refined: "border-brass/40 bg-brass/10 text-brass-deep",
  consolidated: "border-navy/30 bg-navy/10 text-navy",
  added: "border-terracotta/40 bg-terracotta/10 text-terracotta",
};

function ItemCard({ item }: { item: WardrobeItem }) {
  const primary = item.colorIds[0] ?? "cream";
  return (
    <article className="group flex flex-col gap-4 rounded-3xl border border-hairline bg-card p-5 transition-shadow duration-300 hover:shadow-[0_18px_50px_-34px_rgba(56,40,22,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-paper-deep/50 ring-1 ring-hairline/60">
          <GarmentGlyph
            glyph={item.glyph}
            color={hexOf(primary)}
            label={item.name}
            className="h-16 w-16"
          />
        </div>
        <SwatchRow colorIds={item.colorIds} size="md" />
      </div>

      <div className="space-y-1">
        <h3 className="leading-snug font-medium">{item.name}</h3>
        <p className="label-caps text-muted-foreground">
          {CATEGORY_LABELS[item.category]}
        </p>
      </div>

      <dl className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
        <div className="flex gap-2">
          <dt className="w-12 shrink-0 font-medium text-foreground/70">Fabric</dt>
          <dd>{item.fabric}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-12 shrink-0 font-medium text-foreground/70">Fit</dt>
          <dd>{item.fit}</dd>
        </div>
      </dl>

      {item.role ? (
        <p className="text-xs leading-relaxed text-foreground/75 italic">
          {item.role}
        </p>
      ) : null}

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {item.occasions.slice(0, 3).map((occasion) => (
          <li
            key={occasion}
            className="rounded-full border border-hairline px-2.5 py-1 text-[10px] tracking-[0.08em] text-muted-foreground uppercase"
          >
            {OCCASION_LABELS[occasion]}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ItemGrid({ items }: { items: readonly WardrobeItem[] }) {
  const [category, setCategory] = useState<WardrobeCategory | "all">("all");
  const filtered = useMemo(
    () =>
      category === "all"
        ? items
        : items.filter((item) => item.category === category),
    [items, category],
  );
  const available = useMemo(
    () => CATEGORIES.filter((c) => c === "all" || items.some((i) => i.category === c)),
    [items],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 pb-1">
        {available.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-colors",
              category === c
                ? "border-foreground bg-foreground text-primary-foreground"
                : "border-hairline bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {c === "all" ? "All pieces" : CATEGORY_LABELS[c]}
          </button>
        ))}
        <span className="ml-auto hidden shrink-0 items-center px-2 text-xs text-muted-foreground sm:flex">
          {filtered.length} piece{filtered.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function ResolutionBoard() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="The paper trail"
        title="From your list to this capsule."
        description="Every change from the original inventory, recorded and justified — nothing was swapped for taste alone. White became cream, black became washed black, duplicates merged."
      />
      <ol className="divide-y divide-hairline overflow-hidden rounded-3xl border border-hairline bg-card">
        {RESOLUTIONS.map((resolution) => (
          <li
            key={resolution.id}
            className="grid gap-4 p-6 md:grid-cols-[1fr_1.2fr] md:gap-8"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[10px] tracking-[0.12em] uppercase",
                    VERDICT_STYLES[resolution.verdict],
                  )}
                >
                  {resolution.verdict}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/40">
                {resolution.raw}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">{resolution.refined}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {resolution.reason}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Wardrobe() {
  return (
    <div>
      <PageIntro
        eyebrow="The wardrobe"
        title="Every piece earned its place."
        description="A capsule is not a collection — it is a small set of perfect answers. Twenty-five western pieces and sixteen festive ethnic pieces, all in natural fibres, all within one colour system built for warm brown skin."
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline pt-6 text-sm text-muted-foreground">
          <span>
            <strong className="font-medium text-foreground">No synthetics</strong> — matte natural fibres only
          </span>
          <span>
            <strong className="font-medium text-foreground">0-break hems</strong> — nothing puddles
          </span>
          <span>
            <strong className="font-medium text-foreground">Slip-on festive footwear</strong> — pandal-ready
          </span>
        </div>
      </PageIntro>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-14 md:px-8">
        <Tabs defaultValue="western" className="gap-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabsList className="h-11 rounded-full p-1">
              <TabsTrigger
                value="western"
                className="rounded-full px-5 text-xs font-medium tracking-[0.1em] uppercase"
              >
                Day-to-day capsule
              </TabsTrigger>
              <TabsTrigger
                value="ethnic"
                className="rounded-full px-5 text-xs font-medium tracking-[0.1em] uppercase"
              >
                Festive ethnic
              </TabsTrigger>
            </TabsList>
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Navaratri & Durga Puja curation
            </p>
          </div>

          <TabsContent value="western" className="space-y-16">
            <ItemGrid items={CAPSULE_ITEMS} />
            <ResolutionBoard />
          </TabsContent>

          <TabsContent value="ethnic" className="space-y-12">
            <EthnicPhilosophy />
            <ItemGrid items={ETHNIC_ITEMS} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
