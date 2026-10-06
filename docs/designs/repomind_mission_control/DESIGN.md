---
name: RepoMind Mission Control
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1b1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#daffe4'
  on-tertiary: '#003920'
  tertiary-container: '#00f89e'
  on-tertiary-container: '#006d43'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#52ffac'
  tertiary-fixed-dim: '#00e290'
  on-tertiary-fixed: '#002111'
  on-tertiary-fixed-variant: '#005231'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-performance cybernetic cockpit for open-source project intelligence, automated triage, and live multi-agent mission tracking. Engineered for extreme developer comfort, prolonged nocturnal focus, and instant situational awareness, the interface merges high-density telemetry with spatial clarity.

The visual style is **Cybernetic HUD Glassmorphism**: deep obsidian voids, multi-layered obsidian-graphite surfaces, hair-thin neon datum lines, luminous vector nodes, and translucent telemetry panels. Micro-glows and laser-etched 1px borders provide structure without visual clutter, framing complex Git graphs, terminal streams, and autonomous agent states with cinematic authority.

## Colors

The palette simulates a zero-reflection instrument panel with high-contrast functional luminescence.

- **Primary (`#00F0FF`)**: Electric Cyan. Used for active command states, focus rings, primary timeline trajectories, and high-priority systemic cues.
- **Secondary (`#A855F7` / `#8A2BE2`)**: Hyper-Violet / Synthetic Intelligence. Represents automated triage heuristics, background subroutines, neural reasoning pathways, and agent actions.
- **Tertiary (`#00FFA3`)**: Neon Terminal Green. Dedicated to resolved states, successfully merged pull requests, verified signatures, and passing CI/CD pipelines.
- **Warning (`#FFB800`)**: Amber. Signifies race conditions, branch claim conflicts, merge anomalies, and throttling alerts.
- **Danger (`#FF3366`)**: Surgical Red. Used for breaking builds, revoked access, merge conflicts, failed tests, and immediate human-in-the-loop overrides.
- **Surfaces & Foundations**:
  - `bg-void`: `#05070D` (Deep obsidian ground)
  - `surface-panel`: `#0C101A` (Graphite structural ground layer)
  - `surface-elevated`: `#141A28` (Interactive card and dock surface)
  - `surface-overlay`: `#080E1C` (Deep cosmic navy for nested telemetry nodes)
- **Text & Contrast**:
  - `text-bright`: `#F0F6FC` (Primary titles, data values)
  - `text-muted`: `#7D8B9E` (Labels, metadata, secondary timestamps)
  - `border-hairline`: `rgba(0, 240, 255, 0.12)` (Standard HUD boundary)

## Typography

The typographic hierarchy enforces immediate legibility through specialized structural roles:

- **Headings (Space Grotesk)**: Geometric, technical letterforms that evoke aerospace navigation systems. Used for module anchors, mission titles, and high-level KPIs.
- **Body Text (Geist)**: Pure developer ergonomics with optimized vertical metrics, uniform stroke weight, and low eye fatigue across extended viewing sessions.
- **Data & Telemetry (JetBrains Mono)**: Reserved for commit hashes, terminal streams, Git branches, network latency, and HUD status labels. Upper-case treatment is strictly bound to `label-mono` with wide character spacing.

## Layout & Spacing

The system runs on a 4px geometric sub-grid nested inside a fluid, adaptive 12-column system. 

- **Desktop (1440px+)**: A continuous 12-column layout flanked by fixed status telemetry rails (width: 280px). Standard gutter is `1.5rem`, margin is `2.5rem`.
- **Tablet (768px - 1439px)**: Collapses into an 8-column configuration with a collapsible agent drawer. Gutter scales to `1rem`, margin to `1.5rem`.
- **Mobile (< 768px)**: Stacks into a 4-column feed. Secondary status rails collapse into quick-switch tabs docked to the bottom viewport edge.
- **Micro Spacing**: Gaps and paddings inside component hulls scale from `space-xs` (4px) for micro badge padding up to `space-xl` (40px) for mission section delimiters.

## Elevation & Depth

Visual hierarchy uses luminous depth slicing rather than heavy drop shadows:

- **Base Void (Level 0)**: `#05070D` canvas background, featuring an optional SVG coordinate grid pattern rendered at 4% opacity (`rgba(0, 240, 255, 0.04)`).
- **HUD Shell (Level 1)**: `#0C101A` background with `backdrop-filter: blur(12px)` and a crisp `1px solid rgba(255, 255, 255, 0.06)` outline.
- **Floating Modals & Flyouts (Level 2)**: `#141A28` overlay with `1px solid rgba(0, 240, 255, 0.25)` edge illumination and a directional ambient cast: `0 8px 32px -4px rgba(0, 240, 255, 0.08)`.
- **Target Node Glow**: Interactive elements under focus trigger a localized radial aura: `0 0 16px rgba(0, 240, 255, 0.35)`.

## Shapes

The interface adheres to an engineered soft-corner radius scheme (`roundedness: 1`), evoking high-precision laser-milled instrumentation rather than bubbly consumer apps:

- **Standard Elements (inputs, buttons, pill badges)**: `0.25rem` (4px).
- **Cards, Panels, and Terminal Windows**: `0.5rem` (8px).
- **Modal Overlays & Cockpit Drawers**: `0.75rem` (12px).
- **Status Indicators & Pulse Nodes**: Strict `9999px` circular geometry to denote atomic status markers and live telemetry pings.

## Components

### Buttons
- **Primary Cybernetic**: Background `rgba(0, 240, 255, 0.1)`, border `1px solid #00F0FF`, text `#00F0FF`. On hover: background `#00F0FF`, text `#05070D`, box-shadow `0 0 16px rgba(0, 240, 255, 0.4)`.
- **Secondary (Subroutine)**: Background `rgba(168, 85, 247, 0.08)`, border `1px solid rgba(168, 85, 247, 0.3)`, text `#A855F7`.
- **Destructive**: Background `rgba(255, 51, 102, 0.08)`, border `1px solid rgba(255, 51, 102, 0.4)`, text `#FF3366`.

### Badges & Status Chips
- Pill capsules configured with `label-mono`, 4px padding-y, 8px padding-x.
- Prefix with a 6px glowing beacon: `#00FFA3` (Merged), `#FFB800` (Claimed), `#FF3366` (Conflict), `#A855F7` (Synthesizing).

### Telemetry Cards
- Encased in `#0C101A` glass. Border: `1px solid rgba(255, 255, 255, 0.06)`.
- Header bar features a subtle upper-border highlight (`1px solid rgba(0, 240, 255, 0.3)`).

### Input Fields & Terminal Prompts
- Background: `#080E1C`. Border: `1px solid rgba(125, 139, 158, 0.25)`.
- Caret color: `#00F0FF`. Typography: `JetBrains Mono` 13px. Focus states glow with cyan rim-light.

### Mission Timeline UI
- Vertical conduit track: 2px wide line (`rgba(0, 240, 255, 0.15)`).
- Nodes: 12px circular vertices with variable states—hollow ring for queued tasks, pulsating cyan core for active agents, solid emerald glyph for completed merges.