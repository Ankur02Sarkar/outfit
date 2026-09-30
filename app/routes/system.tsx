import { PageIntro, SectionHeading } from "~/components/section-heading";
import { hexOf, SKIN } from "~/data/colors";
import {
  ACCENTS,
  FABRICS_APPROVED,
  FABRICS_AVOID,
  FOUNDATIONS,
  PROFILE,
  REDUNDANCIES,
  RULES,
} from "~/data/palette";
import { cn } from "~/lib/utils";

import type { Route } from "./+types/system";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The system · The Capsule" },
    {
      name: "description",
      content:
        "The full colour system: four foundations, five accents, the redundancy resolutions, the fabric philosophy and the five practical old-money rules.",
    },
  ];
}

function RuleNumber({ index }: { index: number }) {
  return (
    <span className="font-display text-4xl font-light text-brass/70 tabular-nums">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

export default function System() {
  return (
    <div>
      <PageIntro
        eyebrow="The system"
        title="Why the wardrobe looks expensive."
        description="Nothing in this capsule is arbitrary. Five consolidated colours replace fifteen overlapping names, warm tones replace stark ones because of your undertone, and only eight fibre families are allowed through the door."
      >
        <dl className="grid gap-x-10 gap-y-5 border-t border-hairline pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="label-caps text-muted-foreground">Wearer</dt>
            <dd className="mt-1 font-display text-lg">{PROFILE.name}</dd>
          </div>
          <div>
            <dt className="label-caps text-muted-foreground">Skin</dt>
            <dd className="mt-1 flex items-center gap-2 font-display text-lg">
              <span
                aria-hidden
                className="size-4 rounded-full ring-1 ring-foreground/20"
                style={{ backgroundColor: SKIN.hex }}
              />
              {SKIN.name}
            </dd>
          </div>
          <div>
            <dt className="label-caps text-muted-foreground">Undertone</dt>
            <dd className="mt-1 font-display text-lg">{SKIN.undertone}</dd>
          </div>
          <div>
            <dt className="label-caps text-muted-foreground">Aesthetic</dt>
            <dd className="mt-1 font-display text-lg">{PROFILE.aesthetic}</dd>
          </div>
        </dl>
      </PageIntro>

      <div className="mx-auto max-w-6xl space-y-20 px-5 py-14 md:px-8">
        {/* ————— Foundations ————— */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Part one — the base"
            title="Four foundations carry every outfit."
            description="Each foundation replaces a harsher or noisier cousin. Warmth is the through-line: every base sits a shade closer to your golden undertone than the obvious choice would."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {FOUNDATIONS.map((foundation) => (
              <article
                key={foundation.colorId}
                className="flex gap-5 rounded-3xl border border-hairline bg-card p-6"
              >
                <span
                  aria-hidden
                  className="h-28 w-20 shrink-0 rounded-2xl ring-1 ring-foreground/10"
                  style={{ backgroundColor: hexOf(foundation.colorId) }}
                />
                <div className="min-w-0 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-medium tracking-tight">
                      {foundation.label}
                    </h3>
                    <p className="text-xs tracking-[0.1em] text-muted-foreground uppercase">
                      {foundation.role}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {foundation.bestFor.map((use) => (
                      <li
                        key={use}
                        className="rounded-full border border-hairline px-2.5 py-1 text-[10px] tracking-[0.06em] text-muted-foreground uppercase"
                      >
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ————— Accents ————— */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Part two — the accents"
            title="Five accents, used one at a time."
            description="Accents are fireworks: one per outfit, and only against a foundation base. This is the entire reason the combinations read as deliberate rather than decorated."
          />
          <ol className="divide-y divide-hairline overflow-hidden rounded-3xl border border-hairline bg-card">
            {ACCENTS.map((accent) => (
              <li key={accent.colorId} className="flex items-center gap-5 p-5 md:p-6">
                <span
                  aria-hidden
                  className="size-12 shrink-0 rounded-full ring-1 ring-foreground/15"
                  style={{ backgroundColor: hexOf(accent.colorId) }}
                />
                <div className="min-w-0 space-y-1">
                  <h3 className="font-medium">{accent.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {accent.effect}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ————— Redundancy guide ————— */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Part three — the dictionary"
            title="Fifteen colour names, five decisions."
            description="Every fashion source names the same colour differently. These consolidations are the reason the capsule never double-buys a near-duplicate."
          />
          <div className="space-y-4">
            {REDUNDANCIES.map((resolution) => (
              <article
                key={resolution.consolidated}
                className="grid gap-5 rounded-3xl border border-hairline bg-card p-6 md:grid-cols-[1fr_1.4fr] md:gap-10"
              >
                <div className="space-y-3">
                  <p className="label-caps text-muted-foreground">Also called</p>
                  <div className="flex flex-wrap gap-1.5">
                    {resolution.terms.map((term) => (
                      <span
                        key={term}
                        className="rounded-full border border-hairline px-2.5 py-1 text-[10px] tracking-[0.06em] text-muted-foreground uppercase"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="size-5 rounded-full ring-1 ring-foreground/15"
                      style={{ backgroundColor: hexOf(resolution.colorId) }}
                    />
                    <p className="font-display text-lg font-medium tracking-tight">
                      {resolution.consolidated}
                    </p>
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {resolution.why}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ————— Fabrics ————— */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Part four — the fibres"
            title="Eight fibres in. Six impostors out."
            description="Texture is the tell. Natural fibres carry matte slubs and honest structure; synthetics can only imitate shine. This list is absolute — there are no exceptions."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-olive/25 bg-olive/[0.04] p-6 md:p-7">
              <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-medium tracking-tight text-olive">
                Approved — 100% natural
              </h3>
              <ul className="space-y-4">
                {FABRICS_APPROVED.map((fabric) => (
                  <li key={fabric.name} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-olive/70"
                    />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{fabric.name}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {fabric.why}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-terracotta/25 bg-terracotta/[0.04] p-6 md:p-7">
              <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-medium tracking-tight text-terracotta">
                Strictly avoided
              </h3>
              <ul className="space-y-4">
                {FABRICS_AVOID.map((fabric) => (
                  <li key={fabric.name} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta/70"
                    />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{fabric.name}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {fabric.why}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ————— Rules ————— */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Part five — the rules"
            title="Five laws the outfits obey."
            description="These are the wearable translations of everything above — the checks the builder runs on your fit, written the way a tailor would say them."
          />
          <ol className="space-y-4">
            {RULES.map((rule, index) => (
              <li
                key={rule.id}
                className={cn(
                  "flex gap-6 rounded-3xl border border-hairline bg-card p-6 md:items-start md:gap-10 md:p-8",
                )}
              >
                <RuleNumber index={index} />
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-medium tracking-tight">
                    {rule.title}
                  </h3>
                  <p className="text-sm font-medium text-brass-deep">{rule.short}</p>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {rule.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
