<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Codex Context Handoff Rule

- When the conversation becomes long or the working context is getting crowded, update `코덱스 에이전트.md`.
- Keep `코덱스 에이전트.md` organized with these sections:
  - `결정된 것`
  - `안정해지지 않은 것`
  - `다음 할 일`
- Treat `코덱스 에이전트.md` as the local working memory and handoff note for this repository.
- Update the file after meaningful milestones, before risky changes, and before ending a long turn.

## Multi-PC Sync Rule

- The user works across three PCs, so Codex must assume machine changes are normal.
- Keep development repositories and runnable artifacts on each PC locally.
- Keep shared operating knowledge, handoff notes, and cross-PC working state in the user's shared drive knowledge system.
- Do not rely on repository-local session notes as the source of truth for cross-PC handoff.
- When a session resumes or a PC changes, first reconcile the latest shared operating context before making major changes.
- If local repo state and shared operating notes differ, surface the mismatch clearly and prefer the latest confirmed user intent plus the shared notes.
