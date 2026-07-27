# Floodwatch — Landing Page

Marketing site for Floodwatch, a community flood-reporting app for Lagos.
Built as a faithful implementation of the Figma frame `Desktop - 21`
(1440 × 8838).

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens live in `src/index.css` under `@theme`
- **Motion** (Framer Motion) for animation
- **Outfit**, self-hosted via `@fontsource-variable/outfit`

## Getting started

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # typecheck + production build
npx oxlint       # lint
```

## Structure

```
src/
  components/
    ui/blur-fade.tsx      shadcn-style registry component
    feature/              dark "Verified pin" section
    live/                 light "active report" section
    honest/               status-timeline section
    lagos/                "built for Lagos" section
    stepReveal.ts         shared step-sequence choreography
  assets/                 fingerprinted images (imported)
public/assets/            static icons and logo
```

Path alias `@/*` → `src/*` is configured in both `tsconfig.app.json` and
`vite.config.ts`.

## Layout conventions

- Content sits in a **1071px column** (`max-w-[1119px]` + `px-6`).
- The frame's absolute layout applies from **1119px up**, which is where the
  column reaches full width. Below that, sections reflow.
- Card internals authored in frame coordinates render on fixed-size stages that
  scale as a unit, driven by the `--panel-scale` / `--phones-s` ladders in
  `src/index.css`.

## Checking against the design

`scripts/screenshot.mjs` renders the running dev server to a PNG so changes can
be diffed against the Figma frame.

```bash
STATIC=1 node scripts/screenshot.mjs http://localhost:5173/ out.png 1440 1400
```

`STATIC=1` emulates reduced motion, parking every animation at its resting
position — required for pixel comparison, since idle loops otherwise shift
elements between captures. The script also scrolls the page so `inView`
animations trigger before capture.

Note that `scroll-behavior: smooth` is set globally, so any scripted scrolling
needs `behavior: 'instant'` or a long enough wait.

## Known deviations from the frame

Each is deliberate and commented at the relevant call site.

- **Euclid Circular B** (card headings, buttons) is a commercial font we don't
  have. Outfit is substituted throughout.
- The **severity pill** in the light section keeps a fixed width instead of
  animating between the three variants' widths — the width morph fought the
  label cross-fade.
- The **second card pair** in the dark section ships as full-card rasters.
  Figma flattens their translucent sub-layers against the card's white base on
  export, so the layers cannot be recomposited in CSS. Their headings are
  repeated as screen-reader text.
- The **step-by-step reveals** in the timeline and checklist are not in the
  prototype; the frame only animates the logo's pupils.
- Row 2 of the light section's card pair is aligned to the grid; the frame
  places it ~9.5px past the content column.
- `BlurFade` rests at `y: 0`, where the upstream registry component ends at
  `-yOffset` and leaves content permanently offset.

## Copy notes

The frame repeats "Straight from your neighbours." with identical body text
across three cards, and contains typos ("sucessfully", "visible in the Fee").
These are reproduced verbatim rather than silently corrected — worth a decision
before launch.
