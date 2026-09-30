import { Link } from "react-router";

import { ComboCard } from "~/components/combo-card";
import { OutfitFigure } from "~/components/figure/outfit-figure";
import { SectionHeading } from "~/components/section-heading";
import { Swatch } from "~/components/swatch";
import { ALL_COMBOS, getCombo, outfitOfTheDay } from "~/data/combos";
import { hexOf, SKIN } from "~/data/colors";
import { FOUNDATIONS } from "~/data/palette";
import { ALL_ITEMS } from "~/data/wardrobe";
import { Button } from "~/components/ui/button";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Capsule · Ankur's Quiet-Luxury Wardrobe" },
    {
      name: "description",
      content:
        "A personal capsule wardrobe study — western and festive ethnic combinations engineered for warm medium-brown skin, natural fibres and quiet-luxury colour theory.",
    },
  ];
}

export function loader() {
  return { comboId: outfitOfTheDay(new Date()).id };
}

const STATS = [
  { value: String(ALL_ITEMS.length), label: "Curated pieces" },
  { value: String(ALL_COMBOS.length), label: "Heirloom combos" },
  { value: "4", label: "Foundation colours" },
  { value: "5", label: "Layering accents" },
] as const;

function FeaturedCombo({ comboId }: { comboId: string }) {
  const combo = getCombo(comboId);
  return (
    <Link
      to={`/combos#${combo.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-hairline bg-card transition-shadow duration-300 hover:shadow-[0_18px_50px_-30px_rgba(56,40,22,0.45)]"
    >
      <div className="relative flex items-end justify-center border-b border-hairline bg-gradient-to-b from-paper-deep/70 to-paper/30 px-6 pt-6">
        <span className="label-caps absolute top-4 left-5 text-muted-foreground">
          {combo.id}
        </span>
        <OutfitFigure
          config={combo.figure}
          showShadow={false}
          label={`${combo.name} illustration`}
          className="h-52 w-auto transition-transform duration-500 group-hover:-translate-y-1"
        />
      </div>
      <div className="space-y-1.5 p-5">
        <h3 className="font-display text-lg font-medium tracking-tight">
          {combo.name}
        </h3>
        <p className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
          {combo.line === "western" ? "Western" : "Festive"} ·{" "}
          {combo.occasions[0] ? combo.occasions[0].replace("-", " ") : ""}
        </p>
      </div>
    </Link>
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const combo = getCombo(loaderData.comboId);

  return (
    <div>
      {/* ————— Hero ————— */}
      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="size-4 rounded-full ring-1 ring-foreground/20"
                style={{ backgroundColor: SKIN.hex }}
              />
              <p className="label-caps text-muted-foreground">
                {SKIN.name} · {SKIN.undertone}
              </p>
            </div>
            <h1 className="font-display text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-6xl">
              Quiet luxury, calibrated to warm brown skin.
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
              {ALL_ITEMS.length} natural-fibre pieces and {ALL_COMBOS.length}{" "}
              heirloom combinations — western and festive ethnic — every colour
              chosen because it makes golden undertones look their most
              expensive. No synthetics, no logos, no guesswork.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6 text-sm">
                <Link to="/wardrobe">Explore the wardrobe</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-full px-6 text-sm"
              >
                <Link to="/builder">Open the outfit builder</Link>
              </Button>
            </div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-hairline pt-7 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="label-caps text-muted-foreground">{stat.label}</dt>
                  <dd className="font-display text-3xl font-light">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Outfit of the day */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-paper-deep/80 via-transparent to-brass/10"
            />
            <div className="relative overflow-hidden rounded-3xl border border-hairline bg-card shadow-[0_30px_80px_-50px_rgba(56,40,22,0.6)]">
              <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
                <p className="label-caps text-brass">Outfit of the day</p>
                <p className="label-caps text-muted-foreground">{combo.id}</p>
              </div>
              <div className="flex items-end justify-center bg-gradient-to-b from-paper-deep/60 to-paper/20 px-6 pt-8">
                <OutfitFigure
                  config={combo.figure}
                  label={`${combo.name} — outfit of the day`}
                  className="h-80 w-auto"
                />
              </div>
              <div className="space-y-4 border-t border-hairline p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-xl font-medium tracking-tight">
                      {combo.name}
                    </h2>
                    <p className="mt-1 text-xs tracking-[0.08em] text-muted-foreground uppercase">
                      {combo.vibe}
                    </p>
                  </div>
                  <Swatch colorId={combo.top.colorId} size="lg" />
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <Swatch colorId={combo.top.colorId} size="sm" withName />
                  <Swatch colorId={combo.bottom.colorId} size="sm" withName />
                  {combo.layer ? (
                    <Swatch colorId={combo.layer.colorId} size="sm" withName />
                  ) : null}
                </div>
                <Link
                  to={`/combos#${combo.id}`}
                  className="inline-block text-sm font-medium underline-offset-4 hover:text-brass hover:underline"
                >
                  See the full combination →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————— Foundation palette ————— */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The colour system"
              title="Four foundations that never miss."
              description="Every accent in the capsule hangs off these four bases. Because paper-white turns chalky and jet-black turns harsh on wheatish skin, each one is a warmer, deeper cousin of the obvious choice."
            />
            <Link
              to="/system"
              className="text-sm font-medium underline-offset-4 hover:text-brass hover:underline"
            >
              Study the full system →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FOUNDATIONS.map((foundation) => (
              <div
                key={foundation.colorId}
                className="space-y-4 rounded-3xl border border-hairline bg-card p-5"
              >
                <span
                  aria-hidden
                  className="block h-20 w-full rounded-2xl ring-1 ring-foreground/10"
                  style={{ backgroundColor: hexOf(foundation.colorId) }}
                />
                <div className="space-y-1">
                  <h3 className="font-medium">{foundation.label}</h3>
                  <p className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
                    {foundation.role}
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {foundation.bestFor.slice(0, 4).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Featured combinations ————— */}
      <section>
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Combinations"
              title="Three signatures to start with."
              description="One clean daytime favourite, one earthy date-night triad, and one royal Garba night — the rest of the thirteen live on the combos page."
            />
            <Link
              to="/combos"
              className="text-sm font-medium underline-offset-4 hover:text-brass hover:underline"
            >
              All thirteen combos →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeaturedCombo comboId="W-01" />
            <FeaturedCombo comboId="W-02" />
            <FeaturedCombo comboId="PUJA-02" />
          </div>
        </div>
      </section>

      {/* ————— Builder CTA ————— */}
      <section className="border-y border-hairline bg-foreground text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center md:px-8">
          <div className="max-w-xl space-y-2">
            <p className="label-caps text-brass-soft">Sixty seconds, one look</p>
            <h2 className="font-display text-3xl font-light tracking-tight text-balance md:text-4xl">
              Build tonight's fit and let the rules keep score.
            </h2>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              Pick a top, bottom, layer and shoes. The builder checks colour
              harmony, contrast, the leather-match rule and your occasion — then
              shows you exactly how it sits on your skin tone.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-11 rounded-full bg-primary-foreground px-6 text-sm text-foreground hover:bg-primary-foreground/85"
          >
            <Link to="/builder">Start building</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
