import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Check, RefreshCcw, Shuffle, Sparkles, TriangleAlert, X } from "lucide-react";

import { OutfitFigure } from "~/components/figure/outfit-figure";
import { GarmentGlyph } from "~/components/figure/garment-glyph";
import { PageIntro } from "~/components/section-heading";
import { Swatch, SwatchRow } from "~/components/swatch";
import { ALL_COMBOS, getCombo } from "~/data/combos";
import { hexOf, shortNameOf } from "~/data/colors";
import {
  BUILDER_OCCASIONS,
  DEFAULT_SELECTION,
  buildFigure,
  evaluateOutfit,
  optionsForLine,
  selectionFromCombo,
} from "~/lib/builder";
import { cn } from "~/lib/utils";
import type { CheckStatus, GarmentLine, OutfitCombo, WardrobeItem } from "~/lib/types";
import type { BuilderOccasion, BuilderSelection } from "~/lib/builder";

import type { Route } from "./+types/builder";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Outfit builder · The Capsule" },
    {
      name: "description",
      content:
        "Mix any top, bottom, layer and shoes — the rules engine scores colour harmony, contrast, leather matching and occasion fit in real time.",
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

function initialSelection(
  presetId: string | null,
  lineParam: string | null,
): BuilderSelection {
  if (presetId) {
    try {
      return selectionFromCombo(getCombo(presetId));
    } catch {
      // fall through to line default
    }
  }
  if (lineParam && isGarmentLine(lineParam)) {
    return DEFAULT_SELECTION[lineParam];
  }
  return DEFAULT_SELECTION.western;
}

function OptionButton({
  item,
  selected,
  onSelect,
}: {
  item: WardrobeItem;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "w-36 shrink-0 rounded-2xl border p-3 text-left transition-all duration-200",
        selected
          ? "border-foreground/80 bg-secondary shadow-[0_10px_30px_-20px_rgba(56,40,22,0.6)]"
          : "border-hairline bg-card hover:border-foreground/30",
      )}
    >
      <span className="mb-2 flex h-16 items-center justify-center rounded-xl bg-paper-deep/40 ring-1 ring-hairline/50">
        <GarmentGlyph
          glyph={item.glyph}
          color={hexOf(item.colorIds[0] ?? "cream")}
          label={item.name}
          className="h-11 w-11"
        />
      </span>
      <span className="block text-xs leading-snug font-medium">{item.name}</span>
      <SwatchRow colorIds={item.colorIds} className="mt-1.5" />
    </button>
  );
}

function SlotGallery({
  label,
  hint,
  options,
  selectedId,
  onSelect,
  noneOption,
}: {
  label: string;
  hint: string;
  options: readonly WardrobeItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  noneOption?: boolean;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="label-caps text-muted-foreground">{label}</h2>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
        {noneOption ? (
          <button
            type="button"
            onClick={() => onSelect(null)}
            aria-pressed={selectedId === null}
            className={cn(
              "flex w-36 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-3 text-xs transition-colors",
              selectedId === null
                ? "border-foreground/70 bg-secondary text-foreground"
                : "border-hairline bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            <span className="flex h-16 items-center justify-center text-2xl leading-none">
              ∅
            </span>
            No layer — let the base breathe
          </button>
        ) : null}
        {options.map((item) => (
          <OptionButton
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={() => onSelect(item.id)}
          />
        ))}
      </div>
    </section>
  );
}

const STATUS_ICONS: Record<CheckStatus, React.ReactNode> = {
  pass: <Check className="size-4 text-olive" aria-hidden />,
  warn: <TriangleAlert className="size-4 text-brass" aria-hidden />,
  fail: <X className="size-4 text-terracotta" aria-hidden />,
};

export default function Builder() {
  const [searchParams] = useSearchParams();
  const [selection, setSelection] = useState<BuilderSelection>(() =>
    initialSelection(searchParams.get("combo"), searchParams.get("line")),
  );
  const [loadedComboId, setLoadedComboId] = useState<string | null>(() =>
    searchParams.get("combo"),
  );

  const update = (patch: Partial<BuilderSelection>) => {
    setSelection((current) => ({ ...current, ...patch }));
    setLoadedComboId(null);
  };

  const figure = useMemo(() => buildFigure(selection), [selection]);
  const result = useMemo(() => evaluateOutfit(selection), [selection]);

  const tops = optionsForLine(selection.line, "tops");
  const bottoms = optionsForLine(selection.line, "bottoms");
  const layers = optionsForLine(selection.line, "layers");
  const footwear = optionsForLine(selection.line, "footwear");
  const presets = ALL_COMBOS.filter((combo) => combo.line === selection.line);

  const loadCombo = (combo: OutfitCombo) => {
    setSelection(selectionFromCombo(combo));
    setLoadedComboId(combo.id);
  };

  const shuffle = () => {
    const pool = presets.length > 0 ? presets : ALL_COMBOS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) loadCombo(pick);
  };

  const figureLabel = `${selection.line === "western" ? "Western" : "Festive"} outfit — ${tops.find((i) => i.id === selection.topId)?.name ?? "your fit"}`;

  return (
    <div>
      <PageIntro
        eyebrow="The builder"
        title="Mix the capsule. The rules keep score."
        description="Every option below is already inside the system — so the builder does not judge taste, it checks construction: colour harmony, light-to-dark balance, the leather-match rule, occasion fit and warm-undertone synergy."
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* ————— Controls ————— */}
        <div className="min-w-0 space-y-9">
          {/* Line switch */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-full border border-hairline bg-card p-1">
              {LINES.map((line) => (
                <button
                  key={line.id}
                  type="button"
                  onClick={() => {
                    setSelection(DEFAULT_SELECTION[line.id]);
                    setLoadedComboId(null);
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-colors",
                    selection.line === line.id
                      ? "bg-foreground text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {line.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={shuffle}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              <Shuffle className="size-3.5" aria-hidden />
              Surprise me
            </button>
            <button
              type="button"
              onClick={() => {
                setSelection(DEFAULT_SELECTION[selection.line]);
                setLoadedComboId(null);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              <RefreshCcw className="size-3.5" aria-hidden />
              Reset
            </button>
          </div>

          {/* Presets */}
          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="label-caps text-muted-foreground">Curated presets</h2>
              <p className="text-xs text-muted-foreground">
                {selection.line === "western"
                  ? "The eight western signatures"
                  : "The five festive signatures"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((combo) => (
                <button
                  key={combo.id}
                  type="button"
                  onClick={() => loadCombo(combo)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-xs transition-colors",
                    loadedComboId === combo.id
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="mr-1.5 font-medium">{combo.id}</span>
                  {combo.name}
                </button>
              ))}
            </div>
          </section>

          <SlotGallery
            label="Top"
            hint="The garment closest to your skin"
            options={tops}
            selectedId={selection.topId}
            onSelect={(id) => {
              if (id) update({ topId: id });
            }}
          />
          <SlotGallery
            label="Bottom"
            hint="0-break hems, always"
            options={bottoms}
            selectedId={selection.bottomId}
            onSelect={(id) => {
              if (id) update({ bottomId: id });
            }}
          />
          <SlotGallery
            label="Layer"
            hint="Where the outfit becomes a statement"
            options={layers}
            selectedId={selection.layerId}
            onSelect={(id) => update({ layerId: id })}
            noneOption
          />
          <SlotGallery
            label="Footwear"
            hint="Leather must agree with the wrist"
            options={footwear}
            selectedId={selection.footwearId}
            onSelect={(id) => {
              if (id) update({ footwearId: id });
            }}
          />

          {/* Accessories & occasion */}
          <div className="grid gap-8 md:grid-cols-2">
            <section className="space-y-3">
              <h2 className="label-caps text-muted-foreground">Watch & accessories</h2>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {(["vintage", "steel", "none"] as const).map((watch) => (
                    <button
                      key={watch}
                      type="button"
                      onClick={() => update({ watch })}
                      className={cn(
                        "rounded-full border px-3.5 py-2 text-xs font-medium tracking-[0.08em] uppercase transition-colors",
                        selection.watch === watch
                          ? "border-foreground bg-foreground text-primary-foreground"
                          : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {watch === "vintage"
                        ? "Vintage gold watch"
                        : watch === "steel"
                          ? "Steel everyday watch"
                          : "No watch"}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => update({ belt: !selection.belt })}
                    aria-pressed={selection.belt}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-xs transition-colors",
                      selection.belt
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Woven brown belt
                  </button>
                  <button
                    type="button"
                    onClick={() => update({ sunglasses: !selection.sunglasses })}
                    aria-pressed={selection.sunglasses}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-xs transition-colors",
                      selection.sunglasses
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Tortoiseshell eyewear
                  </button>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="label-caps text-muted-foreground">Occasion</h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(BUILDER_OCCASIONS) as BuilderOccasion[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => update({ occasion: key })}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-xs font-medium tracking-[0.08em] uppercase transition-colors",
                      selection.occasion === key
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {BUILDER_OCCASIONS[key].label}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ————— Figure & score ————— */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-hairline bg-card shadow-[0_30px_80px_-50px_rgba(56,40,22,0.6)]">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
              <p className="label-caps text-brass">Your fit, on you</p>
              <p className="label-caps text-muted-foreground">
                {selection.line === "western" ? "Western" : "Festive"}
              </p>
            </div>
            <div className="flex items-end justify-center bg-gradient-to-b from-paper-deep/60 to-paper/20 px-6 pt-6">
              <OutfitFigure config={figure} label={figureLabel} className="h-96 w-auto" />
            </div>
            <div className="space-y-2.5 border-t border-hairline px-5 py-4">
              {[
                { label: "Top", colorId: optionsForLine(selection.line, "tops").find((i) => i.id === selection.topId)?.colorIds[0] },
                { label: "Bottom", colorId: optionsForLine(selection.line, "bottoms").find((i) => i.id === selection.bottomId)?.colorIds[0] },
                {
                  label: "Layer",
                  colorId: selection.layerId
                    ? optionsForLine(selection.line, "layers").find(
                        (i) => i.id === selection.layerId,
                      )?.colorIds[0]
                    : undefined,
                },
                { label: "Shoes", colorId: optionsForLine(selection.line, "footwear").find((i) => i.id === selection.footwearId)?.colorIds[0] },
              ]
                .filter((row) => row.colorId)
                .map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="tracking-[0.1em] text-muted-foreground uppercase">
                      {row.label}
                    </span>
                    <span className="flex items-center gap-2">
                      {row.colorId ? (
                        <>
                          <Swatch colorId={row.colorId} size="sm" />
                          <span>{shortNameOf(row.colorId)}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-hairline bg-card p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="label-caps text-muted-foreground">Rules check</p>
                <p className="font-display text-5xl font-light">{result.score}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-medium tracking-tight">
                  {result.grade}
                </p>
                <p className="max-w-[180px] text-xs leading-relaxed text-muted-foreground">
                  {result.gradeNote}
                </p>
              </div>
            </div>

            <ul className="space-y-3 border-t border-hairline pt-5">
              {result.checks.map((check) => (
                <li key={check.id} className="flex items-start gap-3">
                  <span className="mt-0.5">{STATUS_ICONS[check.status]}</span>
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium tracking-[0.08em] uppercase">
                      {check.label}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {check.message}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {result.notes.length > 0 ? (
              <ul className="space-y-2 border-t border-hairline pt-5">
                {result.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-brass" aria-hidden />
                    {note}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
