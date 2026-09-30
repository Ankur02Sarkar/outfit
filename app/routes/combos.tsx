import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { ComboCard } from "~/components/combo-card";
import { EthnicPhilosophy } from "~/components/ethnic-philosophy";
import { PageIntro } from "~/components/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ETHNIC_COMBOS, WESTERN_COMBOS } from "~/data/combos";
import { OCCASION_LABELS } from "~/lib/types";
import { cn } from "~/lib/utils";
import type { GarmentLine, OccasionTag, OutfitCombo } from "~/lib/types";

import type { Route } from "./+types/combos";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Outfit combos · The Capsule" },
    {
      name: "description",
      content:
        "Eight western combinations and five festive ethnic combinations — engineered for warm medium-brown skin, each with the full breakdown and the colour-theory rationale.",
    },
  ];
}

const LINES: readonly { id: GarmentLine; label: string }[] = [
  { id: "western", label: "Western" },
  { id: "ethnic", label: "Festive ethnic" },
];

function isGarmentLine(value: string): value is GarmentLine {
  return LINES.some((line) => line.id === value);
}

function ComboCollection({
  combos,
  line,
}: {
  combos: readonly OutfitCombo[];
  line: GarmentLine;
}) {
  const [occasion, setOccasion] = useState<OccasionTag | "all">("all");

  const occasionOptions = useMemo(() => {
    const tags = new Set<OccasionTag>();
    combos.forEach((combo) => combo.occasions.forEach((tag) => tags.add(tag)));
    return [...tags];
  }, [combos]);

  const filtered = useMemo(
    () =>
      occasion === "all"
        ? combos
        : combos.filter((combo) => combo.occasions.includes(occasion)),
    [combos, occasion],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setOccasion("all")}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-colors",
            occasion === "all"
              ? "border-foreground bg-foreground text-primary-foreground"
              : "border-hairline bg-card text-muted-foreground hover:text-foreground",
          )}
        >
          All {combos.length} looks
        </button>
        {occasionOptions.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setOccasion(tag)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-colors",
              occasion === tag
                ? "border-foreground bg-foreground text-primary-foreground"
                : "border-hairline bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {OCCASION_LABELS[tag]}
          </button>
        ))}
      </div>

      {line === "ethnic" ? <EthnicPhilosophy /> : null}

      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-hairline p-10 text-center text-sm text-muted-foreground">
          No combinations carry this occasion tag — try another filter.
        </p>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {filtered.map((combo) => (
            <div key={combo.id} id={combo.id} className="scroll-mt-24">
              <ComboCard combo={combo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Combos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [line, setLine] = useState<GarmentLine>(() => {
    const param = searchParams.get("line");
    return param && isGarmentLine(param) ? param : "western";
  });

  return (
    <div>
      <PageIntro
        eyebrow="The combinations"
        title="Thirteen looks that already know the rules."
        description="Each combination was built as an equation: a base, a bottom, a layer, footwear and exactly one accent. The rationale underneath each one explains what it does for warm brown skin — that is the thesis of the whole capsule."
      />

      <div className="mx-auto max-w-6xl space-y-10 px-5 py-14 md:px-8">
        <Tabs
          value={line}
          onValueChange={(value) => {
            if (isGarmentLine(value)) {
              setLine(value);
              setSearchParams(
                (prev) => {
                  const next = new URLSearchParams(prev);
                  next.set("line", value);
                  return next;
                },
                { replace: true, preventScrollReset: true },
              );
            }
          }}
          className="gap-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabsList className="h-11 rounded-full p-1">
              {LINES.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="rounded-full px-5 text-xs font-medium tracking-[0.1em] uppercase"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              {line === "western" ? `${WESTERN_COMBOS.length} western looks` : `${ETHNIC_COMBOS.length} festive looks`}
            </p>
          </div>

          <TabsContent value="western">
            <ComboCollection combos={WESTERN_COMBOS} line="western" />
          </TabsContent>
          <TabsContent value="ethnic">
            <ComboCollection combos={ETHNIC_COMBOS} line="ethnic" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
