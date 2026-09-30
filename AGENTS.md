# AGENTS.md — The Capsule

A personal wardrobe visualiser: a quiet-luxury capsule wardrobe for warm
medium-brown skin, with interactive outfit figures, curated combinations and a
rules-based outfit builder.

## Stack

| Concern    | Choice                                                             |
| ---------- | ------------------------------------------------------------------ |
| Framework  | React Router v8 (framework mode, SSR) on Cloudflare Workers (Vite) |
| Language   | TypeScript strict (`verbatimModuleSyntax`, no `any`)               |
| Styling    | Tailwind CSS v4 (CSS-first `@theme` in `app/app.css`) + shadcn/ui  |
| Font       | Outfit Variable, self-hosted via `@fontsource-variable/outfit`     |
| Package mgr| bun                                                                |

## Commands

```bash
bun run dev        # dev server at http://localhost:5173
bun run typecheck  # wrangler types && react-router typegen && tsc -b  (REQUIRED after changes)
bun run build      # production build (verify before finishing)
bun run deploy     # build + wrangler deploy
```

Always run `bun run typecheck` and `bun run build` after a change set. There is
no test suite or linter configured.

## Directory map

```
app/
  root.tsx                    # html shell, error boundary, favicon
  app.css                     # Tailwind v4 theme: tokens, palette CSS vars, utilities
  routes.ts                   # route config (layout + 5 routes)
  layouts/shell.tsx           # header + main + footer
  routes/
    home.tsx                  # /            hero, outfit of the day, foundations, featured
    wardrobe.tsx              # /wardrobe    item grids + raw→refined resolution board
    combos.tsx                # /combos      western/ethnic tabs, occasion filters (supports ?line=)
    builder.tsx               # /builder     mix & match + live score (supports ?combo=, ?line=)
    system.tsx                # /system      palette, fabric philosophy, rules
  components/
    figure/outfit-figure.tsx  # THE SVG figure engine — all garment shapes live here
    figure/garment-glyph.tsx  # flat-lay garment icons for wardrobe cards
    combo-card.tsx            # full combo card (figure + slots + rationale)
    site-header.tsx / site-footer.tsx / section-heading.tsx / swatch.tsx
    ethnic-philosophy.tsx     # shared festive curation banner
    ui/*.tsx                  # shadcn components (generated — prefer shadcn CLI to edit)
  data/
    colors.ts                 # 29-token colour catalogue + SKIN tone + lookup helpers
    wardrobe.ts               # CAPSULE_ITEMS (25 western) + ETHNIC_ITEMS (16 festive)
    combos.ts                 # WESTERN_COMBOS (W-01…08) + ETHNIC_COMBOS (PUJA-01…05)
    palette.ts                # profile, foundations, accents, redundancies, fabrics, rules, resolutions
  lib/
    types.ts                  # ALL shared types + OCCASION_LABELS
    color.ts                  # hex→rgb, luminance, inkOn/foldStroke/outlineOn helpers
    builder.ts                # selection model, buildFigure(), evaluateOutfit() scoring engine
    utils.ts                  # cn() (re-export from the `cn` package)
public/data.json              # THE ORIGINAL BRIEF — reference only, never edit, never fetch at runtime
```

## Mental model

1. **`public/data.json` is the immutable brief.** It is never imported by the
   app. All app data lives in typed TS modules under `app/data/*`, hand-derived
   from the brief. `app/data/palette.ts`'s `RESOLUTIONS` documents exactly how
   the brief was translated.
2. **Everything is typed from unions, not loose strings.** Colour ids, item
   ids, styles and occasions are union types. Prefer `satisfies` on data arrays
   so bad ids / missing fields fail `tsc`. If you reference a colour id that
   does not exist in `app/data/colors.ts`, it is a bug.
3. **The figure is a pure SVG function of `FigureConfig`.** No randomness, no
   effects — SSR-safe. Multiple figures on one page are supported (unique ids
   via `useId()`), so never hardcode SVG `id="..."` attributes.
4. **The builder treats the brief as law.** `evaluateOutfit()` in
   `app/lib/builder.ts` encodes the rules (harmony, contrast, leather-match,
   occasion, skin-tone synergy). Data-driven, deterministic, score 0–100.

## How-to guides

### Add a new colour token

1. Append to `COLORS` in `app/data/colors.ts` (`id`, `name`, `hex`, `family`,
   `depth`, `roles`, optional `skinNote`). The `ColorId` union derives itself.
2. If it is a foundation/accent, add an entry to `FOUNDATIONS`/`ACCENTS` in
   `app/data/palette.ts` so it appears on `/` and `/system`.

### Add a wardrobe item

1. Add an object to `CAPSULE_ITEMS` (western) or `ETHNIC_ITEMS` (festive) in
   `app/data/wardrobe.ts`.
2. Required fields: `id` (kebab-case, prefixed `top-`/`layer-`/`bottom-`/
   `shoe-`/`acc-`/`etop-`/`elayer-`/`ebottom-`/`eshoe-`), `name`, `category`,
   `line`, `colorIds`, `fabric`, `fabricId`, `fit`, `occasions`, `glyph`.
3. Bowties / bottoms / layers / footwear also need `figureStyle` (a style the
   figure engine knows). See the union types in `app/lib/types.ts`.
4. It appears automatically in `/wardrobe` and in the builder slot galleries.

### Add an outfit combo

1. Add to `WESTERN_COMBOS` or `ETHNIC_COMBOS` in `app/data/combos.ts`.
2. Fill `top/bottom/layer/footwear/accessories` (`ComboSlot`) and a hand-built
   `figure: FigureConfig` using `hexOf("<colorId>")`.
3. **Honesty rule for `itemId`**: only set it when the slot genuinely matches a
   capsule item (same piece, same colourway). If a combo uses a piece outside
   the capsule, omit `itemId` and use `alternate` text instead.
4. Give it `occasions` tags — they drive the `/combos` filters and the
   builder's occasion scoring. Keep `why` in the brief's voice (why it flatters
   warm brown skin).
5. It appears on `/combos`, in the builder presets, and in `outfitOfTheDay()`
   rotation automatically.

### Add a page / route

1. Create `app/routes/<name>.tsx` with `meta()` + default export.
2. Register it in `app/routes.ts` inside the `shell` layout.
3. Use `PageIntro` (top hero) and `SectionHeading` from
   `~/components/section-heading.tsx` for consistency.
4. Add a nav link in `app/components/site-header.tsx` (`NAV_ITEMS`).

### Add a shadcn component

```bash
bunx --bun shadcn@latest add <component> -y
```

Aliases are already configured in `components.json` (`~/components`,
`~/lib/utils`). Generated files land in `app/components/ui/` — avoid hand-
editing them; prefer composing them with local styles.

### Add a new garment shape to the figure

Non-trivial. In `app/components/figure/outfit-figure.tsx`:

1. Add the style string to the relevant union in `app/lib/types.ts`
   (`TopStyle` / `BottomStyle` / `LayerStyle` / `FootwearStyle`).
2. Draw the path(s) at module scope in the figure's 260 × 560 coordinate
   system (head top ≈ 32, shoe sole ≈ 530; the figure is centred on x = 130).
3. Wire it into the matching piece component (`TopPiece`, `BottomPiece`,
   `LayerPiece`, `FootwearPiece`) and add fold lines to the `*_FOLDS` maps.
4. Use the `Piece` helper for fill + fabric pattern + sheen + folds; use
   `foldStroke(color)` / `outlineOn(color)` for details so light and dark
   fabrics stay legible.
5. Verify by running the dev server and screenshotting `/combos` (or
   `/builder?line=ethnic`) — the union type will force you to add the new case
   everywhere it is needed.

### Add a builder check (rule)

Add a block to `evaluateOutfit()` in `app/lib/builder.ts`, push a
`CompatibilityCheck` and (optionally) auto-generated `notes`. Penalties are
uniform (warn −12, fail −25); grades are `Heirloom ≥ 92`, `Bespoke ≥ 78`,
`Considered ≥ 62`, else `Rethink`.

## Styling conventions

- Palette tokens come from `@theme` in `app/app.css`: use classes like
  `bg-paper`, `bg-card`, `border-hairline`, `text-brass`, `text-olive`,
  `text-terracotta`, `text-navy`, plus the shadcn semantic tokens
  (`bg-background`, `text-muted-foreground`, …). **Never hardcode hex values
  in markup** — hexes belong to `app/data/colors.ts` (or `SKIN` in the figure).
- `label-caps` (uppercase micro-label), `hairline`, `paper-grain`,
  `no-scrollbar` are custom utilities in `app.css`.
- Light theme only by design. The `.dark` variant exists but is intentional
  dead weight from shadcn; do not "fix" it, and do not add dark variants.
- Editorial tone: generous whitespace, hairline borders, rounded-2xl/3xl cards,
  `font-display` (Outfit) headings in light weights, brass for accents.
- Copy voice: quiet-luxury, second person for the wearer ("your fit"), warm
  but restrained. Occasion names in copy use Title Case, never ALL CAPS inside
  strings (uppercase is a CSS concern).

## Gotchas

- `public/data.json` is untracked-in-app context for humans and agents — do
  not import it, fetch it, or mutate it.
- `useId()` in the figure must keep the `:` stripping (`useId().replace(/:/g, "")`)
  or SVG `url(#…)` references break in some browsers.
- Never compute random values during render (SSR/hydration mismatch). Random is
  fine inside event handlers only (see "Surprise me" in `builder.tsx`).
- The combos and builder routes accept `?line=western|ethnic`; the builder also
  accepts `?combo=W-XX` to preload a preset. Keep those params working when
  touching navigation.
- `bun run typecheck` regenerates `worker-configuration.d.ts` via `wrangler
  types` — commit its changes if bindings change.
- Route types come from `./+types/<route>` (React Router typegen, ran by
  `typecheck`). New routes need a typecheck run before `Route.MetaArgs` etc.
  resolve.
