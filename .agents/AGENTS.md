## Local Validation Protocol

Before declaring any task or commit complete, the agent must execute and achieve 100% pass:

```bash
pnpm test
```
*(or `pnpm test:ci` / `ng test --watch=false`)*
Any failure blocks delivery.

## Granular Commit Rule
As soon as a significant step (component split, new service, bug fix) is validated with green tests, the agent **must commit immediately** with an accurate Conventional message (e.g. `refactor(ui): ...`, `feat(studio): ...`). Never wait until the end of the conversation to make a single monolithic commit.

## Code Comments Language Rule
* **Code comments exclusively in English**: All code comments, docstrings, annotations, and TODOs must be written in English without exception.
