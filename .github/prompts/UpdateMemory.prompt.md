Your Goal is to update Active-Documentation

> Purpose in the Dev Loop
> 
> 
> Keeping Copilot’s *context window* accurate lets it emit smarter code completions, reviews, and refactors.
> 
> The five “memory” docs inside Active-documentation serve as a living cache of project state—so Copilot can reason about **what the team just did, why, and what comes next**.
> 
> • Fresh **session logs** prime Copilot’s suggestions with current focus.
> 
> • Accurate **task boards** keep auto-generated TODOs and commit messages aligned.
> 
> • Up-to-date **tech context** prevents bogus setup advice.
> 
> • Documented **patterns/decisions** guide architectural‐level refactors.
> 
> • A single **planning source** ties UI specs to feature code, slashing rework.
> 

---

### **Your One-Shot Mission**

1. **Deep-scan** the entire repository (code + docs).
2. For **each file listed below**, generate the **smallest possible unified-diff patch** that brings it 100 % in sync with today’s workspace reality.
3. Touch **only** the lines that truly need change.
4. If a file is already perfect, append exactly: 

*No update needed*

1. **Never** create or delete files outside the list.
2. Guarantee each patch is **atomic, idempotent, and git-apply-clean**.
3. When done, output a **succinct changelog**: updated ✔ / unchanged ➖, plus any cross-file insights.

| Memory File (inside `active-documentation`) | Why it matters to Copilot-driven dev | Expected Content to Evaluate / Patch |
| --- | --- | --- |
| `activeContext.md` | Seeds Copilot with the *now*—keeps its code hints goal-aligned. | Latest focus, key commits, decisions, next steps, insights. |
| `taskProgress.md` | Maps issues/PRs to 👉 completions, letting Copilot auto-reference them. | Task board (✔ done, 🕓 in-progress, ❗ blockers). |
| `techContext.md` | Prevents setup drift & bad dependency advice. | Stack summary, env vars, pinned deps, CI quirks. |
| `systemPatterns.md` | Guides architecture-level suggestions (e.g., reuse a pattern). | New or changed patterns, decisions, component relationships. |
| `ProjectPlanning.md` | Single point tying vision → features → UI; keeps Copilot’s doc comments consistent. | Product vision, feature list, UI/UX outline (must mirror `taskProgress.md`). |

---

### **Editing Ground Rules**

- **Recency wins** — prefer current reality over stale history.
- **Surgical diffs** — smallest hunks; preserve surrounding formatting & emoji.
- **Confidentiality** — never expose secrets; respect `.gitignore`.
- **Validation** — ensure diff applies cleanly via `git apply --check`.