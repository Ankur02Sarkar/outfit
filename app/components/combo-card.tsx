import { Link } from "react-router";

import { OutfitFigure } from "~/components/figure/outfit-figure";
import { Swatch } from "~/components/swatch";
import { cn } from "~/lib/utils";
import type { ComboSlot, OutfitCombo } from "~/lib/types";

function SlotRow({ label, slot }: { label: string; slot: ComboSlot }) {
  return (
    <div className="flex items-start gap-3">
      <Swatch colorId={slot.colorId} size="sm" className="mt-1.5" />
      <div className="min-w-0 space-y-0.5">
        <p className="label-caps text-muted-foreground">{label}</p>
        <p className="text-sm leading-snug">{slot.label}</p>
        {slot.detail ? (
          <p className="text-xs leading-relaxed text-muted-foreground">{slot.detail}</p>
        ) : null}
        {slot.alternate ? (
          <p className="text-xs leading-relaxed text-muted-foreground italic">
            or {slot.alternate}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export interface ComboCardProps {
  combo: OutfitCombo;
  className?: string;
}

export function ComboCard({ combo, className }: ComboCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-card transition-shadow duration-300 hover:shadow-[0_18px_50px_-30px_rgba(56,40,22,0.45)]",
        className,
      )}
    >
      <div className="relative flex items-end justify-center overflow-hidden border-b border-hairline bg-gradient-to-b from-paper-deep/70 to-paper/30 px-6 pt-8">
        <span className="label-caps absolute top-5 left-6 text-muted-foreground">
          {combo.id}
        </span>
        <span className="label-caps absolute top-5 right-6 rounded-full border border-hairline bg-card px-2.5 py-1 text-muted-foreground">
          {combo.line === "western" ? "Western" : "Festive ethnic"}
        </span>
        <div
          aria-hidden
          className="absolute bottom-0 h-10 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(86,62,36,0.24),transparent)]"
        />
        <OutfitFigure
          config={combo.figure}
          label={`${combo.name} — outfit illustration`}
          className="relative h-80 w-auto transition-transform duration-500 group-hover:-translate-y-1"
        />
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <header className="space-y-1.5">
          <h3 className="font-display text-xl font-medium tracking-tight">
            {combo.name}
          </h3>
          <p className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
            {combo.vibe}
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <SlotRow label="Top" slot={combo.top} />
          <SlotRow label="Bottom" slot={combo.bottom} />
          <SlotRow label="Layer" slot={combo.layer ?? { label: "None — let the base breathe", colorId: "cream" }} />
          <SlotRow label="Footwear" slot={combo.footwear} />
          {combo.accessories ? (
            <div className="sm:col-span-2">
              <SlotRow label="Watch & accessories" slot={combo.accessories} />
            </div>
          ) : null}
        </div>

        <blockquote className="border-l-2 border-brass/60 pl-4 text-sm leading-relaxed text-foreground/85">
          <p className="label-caps mb-1 text-brass">Why it works on brown skin</p>
          {combo.why}
        </blockquote>

        <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4">
          <Link
            to={`/builder?combo=${combo.id}`}
            className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-brass hover:underline"
          >
            Tune this in the builder →
          </Link>
          <span className="text-xs text-muted-foreground">
            {[combo.top, combo.bottom, combo.layer, combo.footwear, combo.accessories]
              .filter(Boolean)
              .length}{" "}
            pieces
          </span>
        </div>
      </div>
    </article>
  );
}
