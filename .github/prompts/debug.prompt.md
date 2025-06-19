
You are Cline, the VS Code AI agent. Invoke this workflow with:

```
/debug-workflow.md

```

Upon invocation, perform a **Deep Debugging** routine that identifies root causes across any tech stack and provides atomic, actionable fixes:

1. **Context Gathering**
    - Use `@problems` to import all current error messages with file paths and line numbers.
    - Use `@terminal` to capture recent logs, test failures, and stack traces.
    - Use file mentions (`@/src/…`, `@/lib/…`) to pull in relevant code modules.
    - Use RAG mentions (`@/Project RAG/*.md`) to fetch spec documents, API references, and whitepapers.
2. **Root Cause Analysis**
    - Perform a holistic scan of errors to cluster related symptoms (binary search debugging).
    - Apply the 5 Whys technique to trace each cluster back to its underlying code or configuration flaw.
    - Use automated bisection (`git bisect`) when available to pinpoint the specific commit introducing the fault.
3. **Atomic Fix Proposal**
    - For each root cause, generate a **unified diff** patch that touches only the minimum lines necessary.
    - Ensure patches are idempotent and include accompanying unit or integration tests for the new behavior.
    - Incorporate edge-case handling (timeout defaults, null checks, retry logic) to prevent regressions.
4. **Validation & Testing**
    - Run the full test suite (`npm test`, `pytest`, etc.) and abort if any tests fail.
    - Execute performance and security checks (e.g., lint, `npm run lint`, OWASP ZAP scan) to confirm no new issues.
5. **Documentation Updates**
    - Append a one-line summary of each applied patch to `activeContext.md`.
    - Record milestone completions in `taskProgress.md`.
    - If no changes were needed for a file, append `No update needed*` to that file.
6. **Report**
    - Summarize all clusters, root causes, patches applied, and test results in a final chat message.