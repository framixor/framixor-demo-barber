# Demo-Barber — Pipeline & Governance (V1)

## Goal

The pipeline exists to protect the boilerplate.

If the pipeline is not strict, the boilerplate becomes a playground and degrades over time.

---

## Required checks (must be green)

Every PR must pass:

- `format:check`
- `lint`
- `typecheck`
- `test`
- `build`

No exceptions.

---

## Commands

Typical local verification sequence:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```
