# Haris Faisal — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4. Statically rendered, no backend.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where the content lives

All copy is data, kept out of the components. Edit these files and the page updates —
you should not need to touch JSX to change what the site says.

| File | Contents |
| --- | --- |
| `src/features/profile/data/user.ts` | Name, role, tagline, avatar path, location, email, About paragraphs |
| `src/features/profile/data/social-links.ts` | GitHub / LinkedIn / email cards |
| `src/features/profile/data/tech-stack.ts` | Tech stack, grouped by category |
| `src/features/profile/data/experiences.ts` | Companies, roles, bullet highlights, skills |
| `src/features/profile/data/projects.ts` | `FEATURED_PROJECTS` and `OTHER_PROJECTS` |
| `src/config/site.ts` | Site title/description/URL and the nav items |

`src/features/profile/types.ts` describes the shape of each record, so your editor will
flag a missing or misspelled field.

## Section order

Header/nav → profile header → overview → social links → GitHub activity → About → tech
stack → experience → featured projects → other projects → contact → footer. The order is
set in `src/app/page.tsx`; each numbered `PanelHeader index` follows this order too, so
inserting or removing a section means renumbering the ones after it.

## Swapping in your own images

**Avatar and banner** — both are crops of the same illustration, generated with
`sharp` from the original in `~/Downloads`:

- `public/images/avatar.jpg` — 320x320 square crop of the face
- `public/images/workspace.jpg` — 1536px-wide version of the full scene, used as the
  banner above the profile header (524KB original -> 88KB)

Paths live on `USER.avatar` and `USER.cover`. To reframe the banner without re-cropping,
change the `object-[50%_38%]` position in `profile-header.tsx`. To use a real photo, drop
it in and update those two fields.

**Architecture diagrams** — each featured project points at its own file, so replacing one
never affects the other:

```ts
architectureImage: "/images/projects/instructli-architecture.svg",
architectureSize: { width: 880, height: 470 },  // intrinsic size of that file
architectureCaption: "…",                       // also used as the image alt text
```

Drop a `.png`, `.jpg`, or `.svg` into `public/images/projects/`, update
`architectureImage`, and set `architectureSize` to that file's real pixel dimensions —
that reservation is what stops the page from jumping as the image loads. Both diagrams
ship as hand-drawn SVGs on a dark plate so they read the same in light and dark mode.

Remove `architectureImage` and the card renders a labelled empty frame instead.
Only featured cards show the frame; `<ProjectItem>` takes a `showArchitecture` prop.

## Tech stack icons

Chips in the tech stack resolve an icon through `src/features/profile/lib/tech-icons.ts`,
in three tiers:

1. **Brand mark** — a real logo from the `simple-icons` package, inlined as SVG at build
   time. No CDN, no runtime request. Add one by importing the icon and mapping the
   display name in `BRANDS`.
2. **Generic glyph** — a lucide icon in the muted text colour, for entries with no
   distributable logo. Mapped in `GENERIC`.
3. **Monogram** — first letter, if a name matches neither map.

Brand colours are chosen for a white page, so several (Next.js `#000000`, OpenJDK
`#000000`, Django `#092E20`) would vanish in dark mode. `themeSafeColors()` keeps the hue
and clamps lightness per theme; near-greyscale marks fall back to the page text colour,
which is how those brands present themselves anyway.

Some logos are deliberately absent: simple-icons has removed OpenAI, the whole AWS family,
Playwright, Apache Iceberg and Cohere following trademark requests, so those use generic
glyphs rather than a recreated trademark. Java uses the OpenJDK mark for the same reason.

## Collapsibles

Built on Radix Collapsible, so every disclosure is a real `<button>` with
`aria-expanded`/`aria-controls` and works with Enter and Space.

- Experience: the current role opens by default (`isExpanded: true` on that position),
  past roles start collapsed.
- Featured projects: expanded by default. Other projects: collapsed.

Set `isExpanded` in the data files to change any of these.

## GitHub activity graph

The "GitHub activity" panel is a self-drawn SVG calendar, not an embedded widget or image.

**Data** — `src/features/profile/data/github-contributions.ts` fetches from
`github-contributions-api.jogruber.de`, a free, unofficial API that mirrors GitHub's own
contribution calendar. GitHub has no public endpoint for this data; the only official
source is an authenticated GraphQL query, which would need a token. This has no auth, at
the cost of depending on a third party's uptime rather than GitHub's own.

The fetch uses Next's `revalidate: 60 * 60 * 24` — refreshed at most once a day, not on
every request, via ISR. `GITHUB_USERNAME` lives in `src/config/site.ts`; change it there to
point the graph at a different account.

**Failure handling** — the fetch is wrapped in try/catch and returns `[]` on any error
(network failure, non-200, malformed JSON). `GithubContributions` renders nothing at all
when there's no data, rather than showing a broken graph. One cosmetic side effect: if the
fetch fails, the `<Divider />` that follows the section in `page.tsx` has no panel above it
to separate from the previous one, producing two hairline bands in a row — harmless, just
not seamless. This only happens if the third-party API is down.

**Rendering** — `src/features/profile/lib/contribution-graph.ts` does the calendar math
(`date-fns`): laying activities into whole weeks, filling any day the API omitted with a
zero-activity placeholder, and picking which week column each month label sits above
(skipping a label that would land within 2 columns of the previous one, so a one-week
sliver at the start of the year never collides with its neighbour). The component itself
just lays out `<rect>`s from that.

Cell colour is five steps of `color-mix(in oklch, var(--accent) X%, var(--edge))` rather
than a hardcoded palette, so the graph is always built from whichever theme is active — no
separate light/dark color table to keep in sync.

On narrow screens the grid sits in its own horizontally-scrolling container, defaulted to
its **end** (most recent weeks) rather than the start, via a `dir="rtl"` / `dir="ltr"` flip
— a CSS-only trick, so a mobile visitor sees current activity first with no JavaScript
needed to set the scroll position.

**Tooltip** — the grid (`github-contributions-grid.tsx`) is a small client component that
tracks the hovered cell in state and renders one tooltip `<div>` positioned above it,
appearing the instant the pointer lands on a cell. The first version used a native SVG
`<title>` per cell instead; that needs the cursor to sit still for the browser's own
tooltip delay (~1–1.5s) before showing anything, and these cells are 10px square with 3px
gaps, so a hair of drift resets that timer before it ever fires — in practice it almost
never appeared. This is also why GitHub's own graph, and the reference repo, use a custom
tooltip rather than the native one.

The SVG itself still carries a single `role="img"` with a summary `aria-label` (total
count), and cells are otherwise undecorated — reading 371 individual day cells aloud would
not be useful, which is how GitHub's own graph is exposed to screen readers too.

## Design notes

The layout is a fixed-width column with visible side rails. Two Tailwind utilities in
`src/app/globals.css` do most of the work:

- `screen-line-before` / `screen-line-after` — a hairline that escapes the column and
  runs the full viewport width.
- `hatch` — the diagonal fill used in the structural gaps between panels.

### Light switch

Two themes — Paper (light) and Slate (dark) — toggled by a literal rocker switch
(`theme-switch.tsx`) instead of a sliding pill. It's a real `role="switch"` button: a
housing with a pivot pin, and a paddle carrying both icons that rotates as one rigid body
in 3D (`rotateX`, with `perspective` on the housing) so flipping it looks like the moon and
sun trade places, the way a real wall switch pivots on a hinge. The active side glows in
the accent colour; the button also scales down slightly on press for a tactile click.
Space and Enter both flip it, same as clicking.

`next-themes` still resolves the OS preference (`light` → Paper, `dark` → Slate) via a
`data-theme` attribute on `<html>`. Palette tokens live at the top of `globals.css`; the
`dark` Tailwind variant matches `[data-theme="slate"]`.

### Crosshair cursor

`crosshair-cursor.tsx` draws two hairlines tracking the pointer across the viewport, a node
marker at the intersection, and a live coordinate readout — the same full-bleed rules the
layout already uses, turned into a drafting overlay. The lines shift to full accent colour
over anything interactive, and every left click drops an expanding ring at the click point
(a right-click does not — that gesture belongs to the context menu, not this).

It removes itself entirely for coarse pointers (touch) and for `prefers-reduced-motion`,
re-checking on change. Pointer moves are coalesced to one write per animation frame, it
moves via `transform` only, and the overlay is `pointer-events: none`, so it never
intercepts a click.

### Reveal on scroll

`reveal.tsx` wraps each major section in `page.tsx` and fades it in the first time it
scrolls into view, so the page reads as loading progressively as you go down it. Content
already on screen at load is never hidden — only sections starting below the fold hide
(via an `IntersectionObserver`, one-time) and then reveal, and everything is in the DOM and
visible by default regardless, so a no-JS visit or a slow hydration never hides content
behind a script that hasn't run yet. `prefers-reduced-motion` skips the hide entirely.

### Space shooter

A small easter egg, `src/components/space-shooter.tsx`, mounted once in `layout.tsx` so it
sits fixed in the bottom-left corner on every page and every scroll position. Click it (or
tab to it and press Enter) to play — arrow keys or drag/touch to move, Space to shoot.
Clicking anywhere else, or Escape, stops it.

The play field's internal simulation is a fixed 256x168 — ship speed, hitboxes, everything
— at every screen size; only the *rendered* size changes, via a plain CSS
`scale-[0.42] sm:scale-[0.58] lg:scale-[0.72]` with `origin-bottom-left` so it shrinks
toward the corner it's pinned to rather than drifting — on a phone the whole widget is
about 108x81, versus the 258x192 it draws at internally. That keeps the game feel identical
everywhere and needs no resize listener, but it does mean touch/drag control has to keep
working through a transform: `getBoundingClientRect()` already reports the post-transform
box in every browser, so the existing `(event.clientX - rect.left) / rect.width * WIDTH`
pointer math needed no changes — verified by dragging to both edges at the smallest scale
and confirming the ship actually reaches them, not just assumed from the CSS.

It's still a `position: fixed` corner widget, so at some scroll position it will always sit
over *something* — shrinking it reduces how much, not whether. If that's still not enough,
the fix is those three numbers, not the architecture: sizing lives entirely in that one
`scale-[...]` class, nothing else needs to change to go smaller (or larger) still.

The player is a drawn rocket — nose, swept fins, a cockpit window, a flickering engine
flame — rather than a flat triangle, and enemies are small flying saucers (body, dome,
running lights), all built from `ctx.beginPath()`/`arc`/`ellipse` calls rather than sprite
images, so they redraw crisply at any size or pixel density with no assets to ship.

That "stops it" behaviour is real DOM focus/blur, not a separate tracked flag: the widget
is a single `tabIndex={0}` element, and its keydown handler is a normal React prop on that
element, so it can only ever fire while that element actually has focus. This matters
beyond the game itself — an earlier design used a `window`-level keydown listener toggled
by a boolean, which would have kept intercepting Space and the arrow keys even after
tabbing away to, say, the theme switch, breaking its own Space-to-toggle. Scoping to real
focus makes that impossible: focus can only be in one place, so playing the game and
operating anything else on the page can never fight over the same keystroke.

The game only runs — canvas repaints, `requestAnimationFrame` loop, everything — while
focused. Idle, it costs nothing: one static frame, no listeners beyond the ones needed to
notice a click, Enter, or tab-in. Blurring freezes the current frame (ship, bullets,
enemies, score all preserved) behind a "click to resume" scrim rather than resetting it.

Canvas can't take a CSS custom property directly in `fillStyle` the way the contribution
graph's SVG could — `fill="var(--edge)"` works in SVG, `ctx.fillStyle = "var(--edge)"` does
not. Colours are read once via `getComputedStyle(document.documentElement)` into a ref, and
a `MutationObserver` on `data-theme` refreshes that ref (and repaints immediately if idle)
the moment the light switch flips, so the game is never caught showing the wrong theme.

Layout and interaction patterns were studied from
[abdulrehmanwaseem/My-Portfolio](https://github.com/abdulrehmanwaseem/My-Portfolio)
(MIT). No content, copy, images, or styling were copied from it — the visual design,
palette, components, and all text here are original.
