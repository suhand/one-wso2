# One WSO2 — Webapp

React 19 + Vite 7 + TypeScript port of the `prototype/index.html` mock, following the same conventions as `cs-tools/apps/customer-portal/webapp`. Same Asgardeo auth pattern (runtime `window.config`), same Oxygen-UI theme, same route-guard structure.

## Quick start

```bash
pnpm install

# One-time: copy the config template
cp public/config.js.example public/config.js
# Then fill in the four ONE_WSO2_AUTH_* values in public/config.js

pnpm dev            # → http://localhost:3000
```

`public/config.js` is git-ignored — never commit env-specific values. At deploy time, Choreo (or whatever hosts the static bundle) injects a fresh `config.js` per environment; the same build serves any env.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Vite dev server on port 3000 |
| `pnpm build` | TypeScript project build (`tsc -b`) then Vite production bundle → `dist/` |
| `pnpm preview` | Serve the built `dist/` locally to verify the bundle |
| `pnpm lint` | ESLint over `src/` |

## Runtime config (window.config)

Everything comes from `public/config.js` at runtime, not `.env`. Populated variables (see `public/config.js.example`):

| Key | Purpose |
|---|---|
| `ONE_WSO2_AUTH_BASE_URL` | Asgardeo tenant URL (e.g. `https://api.asgardeo.io/t/wso2`) |
| `ONE_WSO2_AUTH_CLIENT_ID` | Application client ID from Asgardeo |
| `ONE_WSO2_AUTH_SIGN_IN_REDIRECT_URL` | Where Asgardeo returns after sign-in (must match app registration) |
| `ONE_WSO2_AUTH_SIGN_OUT_REDIRECT_URL` | Where Asgardeo returns after sign-out |
| `ONE_WSO2_THEME` | Oxygen-UI theme name — `acrylicOrange` (default), `acrylicPurple`, `classic`, `highContrast` |

## Directory layout

```
webapp/
├── public/
│   ├── config.js.example    → template (copy to config.js, fill values)
│   ├── favicon.svg          → WSO2 logomark
│   └── wso2-logo-*.svg      → wordmarks for light/dark headers
├── src/
│   ├── main.tsx             → React root
│   ├── AppWithConfig.tsx    → provider tree (Asgardeo, Router, Oxygen theme, Query)
│   ├── App.tsx              → routes
│   ├── config/              → runtime config resolution (authConfig, themeConfig)
│   ├── constants/           → perspective registry (single source of truth for waffle + rail)
│   ├── context/             → PerspectiveContext, ThemeModeContext
│   ├── layouts/             → AuthGuard, AppLayout (shell)
│   ├── components/          → shell chrome (TopBar, SideRail, WaffleOverlay, AskNoveraPalette)
│   └── features/            → feature-sliced folders
│       ├── people-ops/      → flagship perspective (hiring, candidates, performance, ops)
│       ├── my/              → profile perspective (hero, general, personal, connected)
│       └── service-requests/ → cross-cutting requests catalog
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Perspective model

The waffle switcher (top-right) is the primary persona selector. Each perspective is registered in `src/constants/perspectives.ts` with `access` and `sections`:

- **Functional perspectives** — CSM · People Ops · Sales · Rev Ops · Marketing · Finance · Leadership. Only **People Ops** is unlocked; the rest render as 🔒 in the waffle.
- **Cross perspectives** — My · Service Requests. Always accessible, and shown in the rail's "For you" group on every page.

The left rail derives from the active perspective's `sections` list; each entry smoothly scrolls the canvas to a matching `id`. Change what's in the rail by editing the perspective's `sections` array — no code changes elsewhere.

## Adding a new perspective

1. Add an entry to `PERSPECTIVES` in `src/constants/perspectives.ts` (with `access: true`, a `path`, and its `sections`).
2. Create `src/features/<key>/pages/<Key>Page.tsx`.
3. Add a matching `<Route>` in `src/App.tsx`.
4. Give each section on the page an `id` matching what you registered.

The waffle and rail pick it up automatically.

## Auth flow

`<AuthGuard>` wraps every route. On mount:
1. If Asgardeo says signed in → render children.
2. If not → stash the intended URL in `sessionStorage.one_wso2_post_login_redirect` and call `signIn()`. After the redirect completes, the guard restores the original URL.

The token is available anywhere via `useAsgardeo().getIdToken()` — same interface as customer-portal.

## Ask Novera palette

`⌘K` (or clicking the top-bar Ask Novera bar) opens the palette. Currently a UI-only mock — wire it to a Novera backend (or a Choreo gateway `/query` endpoint) when the integration lands.

## What still uses static data

Every card in `features/*/constants/` holds mocked domain data ported from the prototype. Swap each constants module for a React Query hook (`useOpenRequisitions`, `useRecentJoiners`, …) once the backends exist. The tanstack/react-query provider is already wired in `AppWithConfig.tsx`.
