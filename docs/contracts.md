# Demo-Barber — Contracts (V1)

## Goal

Define the **immutable contract rules** for Demo-Barber.
Contracts are the only supported customization mechanism for client websites.

If you break contracts, you break the product.

---

## Contract-first principle

- UI components must never import JSON contracts directly.
- UI consumes contract data via hooks only (`useBusiness`, `useTheme`).
- Contracts are **read-only** at runtime.

---

## File-based contracts (V1)

V1 uses explicit, file-based JSON imports.

- Business contracts (client-owned):
  - `src/contracts/clients/<client>/business.json`

- Theme presets (boilerplate-owned):
  - `src/contracts/themes/<preset>.json`

---

## Business Contract (`business.json`)

### Ownership

- Client-owned: **yes**
- Boilerplate-owned structure: **yes**
- Allowed edits: business data + SEO + theme preset selection

### Contract shape

Business contract is a single JSON file with top-level sections:

- `version`
- `business`
- `seo`
- `themePreset`

### Required invariants

- `version` must exist
- `business.legalName` and `business.displayName` must exist
- `seo.title` and `seo.description` must exist
- `themePreset` must be a valid preset key

### Theme selection rule

`themePreset` is a **preset name**, not a token object.

Allowed:

- `"themePreset": "premium-gold"`

Not allowed:

- `"themePreset": { "tokens": ... }`

If an unknown preset is selected, the runtime must fail-closed to `DEFAULT_THEME_PRESET`.

---

## Theme Presets (boilerplate-owned)

### Ownership

- Client-owned: **no**
- Boilerplate-owned: **yes**

A theme preset is a JSON file that contains:

- `version`
- `primaryStyle` (e.g., `solid` or `gradient`)
- `tokens` (HSL tokens)

Clients can only reference a preset by name; they cannot define arbitrary colors.

### Why presets are immutable

- Prevents design drift
- Maintains premium baseline
- Keeps automation deterministic
- Enables safe multi-client scale

---

## Wiring rules (`load.ts`)

- Imports must be explicit (no dynamic import strings)
- New clients require:
  1. adding `business.json` import
  2. mapping it into `BUSINESS_BY_CLIENT`
- New theme presets require:
  1. adding the theme JSON import
  2. mapping it into `THEME_PRESET_BY_KEY`

---

## Environment overrides

V1 may support safe overrides via env:

- `VITE_CLIENT` controls the active client slug
- `VITE_THEME_PRESET` may force a theme preset for testing

Overrides must be:

- optional
- validated
- fail-closed to defaults

---

## What is NOT a contract (V1)

The following are not supported customization mechanisms:

- per-client conditionals in JSX
- per-client layout edits
- CSS overrides per client
- direct token injection in client JSON

If a client needs those, they require a different product tier.
