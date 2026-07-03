# One — Experience Design

Design vision and interactive prototype for **One**, WSO2's unified internal digital experience (web · mobile · agentic).

> **Repo:** `one-wso2` will hold the source code for the One WSO2 web application. Today it contains the experience design deliverables that define what we're building.
>
> **Ownership:** This repo is being handed off to own and drive forward. Start with [`docs/One-Experience-Vision.md`](docs/One-Experience-Vision.md), then open the prototype.

---

## What's here

| Path | What it is |
|---|---|
| [`docs/One-Experience-Vision.md`](docs/One-Experience-Vision.md) | **The design doc.** Strategy, the Perspectives model, information architecture, agentic layer, per-perspective detail, screens, visual language, phasing, and open questions. Start here. |
| [`prototype/index.html`](prototype/index.html) | **Clickable prototype.** Self-contained HTML — open it in any browser. No build step. |
| [`PROMPT.md`](PROMPT.md) | The original design prompt used to generate the first draft, so you can re-run or evolve the direction. |

## View the prototype

It's a single self-contained file — just open it:

```bash
open prototype/index.html          # macOS
# or double-click the file
```

Things to try in the prototype:
- Switch **perspectives** via the left rail or the **⊞ waffle** (top-right). Locked (🔒) ones show permission-gating.
- Press **⌘K / Ctrl+K** to open **Ask One** — note the context follows the active perspective.
- Open the **Service Requests** perspective to see the auto-generated-form idea.
- Toggle **dark mode** and **📱 Mobile view** (bottom controls).

---

## Grounding — what was decided

Based on the One App Experience Brainstorming Session (26 Jun 2026). Fixed decisions this design builds on:

- **Brand is "One."** Three channels: **web** (primary), **mobile** super-app, **agentic** (assistant + autonomous agents).
- **Internal employee experience first.** Customer portal, billing, invoicing, contracting are **out** — they belong to a separate **Cloud** experience (AWS-console-style).
- **Navigation = "Perspectives"** (persona-first, not domain-first): *functional* (CSM, Sales, Rev Ops, Marketing, People Ops, Finance, Leadership — permission-gated) + *cross-cutting* (My, Service Requests — everyone). Role-based home perspective, switchable.
- **Gmail** is the reference model (one-stop-shop).
- **Frontend monolith** (single React app over modular SSO-joined backends) with a strict contribution process.
- **Digital Transformation = foundation; Agentic Enterprise = layer on top.**
- **Phase 1 launches CSM + People Ops.** Ship low-hanging fruit first; don't over-engineer configurable dashboards.

## Open questions to resolve (see doc, Appendix B)

1. Home-perspective configurability — default-only for Phase 1 vs. user-set.
2. Lock the Phase-1 functional list and name the Leadership view.
3. Assistant context-scoping rules per perspective.
4. Service Requests: hand-built forms vs. the service-definition parser approach.
5. Monolith governance (ownership, module boundaries, review).
6. Exact Cloud boundary where internal partner/hiring ends and the commercial portal begins.

## Suggested next steps for the owner

1. Review the doc and confirm/adjust the calls flagged in Appendix B.
2. Lock the Phase-1 perspective scope (CSM + People Ops) into build requirements.
3. Define perspective + dashboard layouts for the initial build.
4. Stand up the monolith front-end skeleton and the contribution process.
5. Evolve the prototype into the real shell (perspective rail, Ask One, waffle switcher).

---

*Source: [One WSO2 App Experience Brainstorming Session — Notes by Gemini](https://docs.google.com/document/d/1IVJXZixYl4VfcINRCtFfwd94M1wE7TUn5eHoDEsgexc/edit) · WSO2 brand: monochrome + orange pulse `#F14E23`.*
