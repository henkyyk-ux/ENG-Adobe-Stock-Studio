# Agent Instructions — Hermes / Coding Agents

You are working on ENG Adobe Stock Studio.

## Before Any Implementation

Read:
- PROJECT.md
- ARCHITECTURE.md
- DEVELOPMENT_RULES.md
- ROADMAP.md
- relevant docs/
- relevant skills/

Then inspect the current repository.

Do not code immediately.

Return:
1. understanding of requested phase
2. current repository state
3. architecture impact
4. files to create/change
5. risks
6. tests to run

## Implementation Behavior

- follow project documents as source of truth
- do not invent unrelated features
- preserve existing functionality
- prefer simple maintainable solutions
- keep provider abstraction
- keep workflow state server-side
- validate AI output
- log production transitions
- never expose secrets
- never fake capabilities

## Phase Discipline

Only implement the requested phase.

Do not silently implement future phases.

## Completion Report

After implementation report:
- files changed
- behavior added
- tests run
- test results
- known limitations
- next recommended phase

Do not commit unless explicitly instructed.

## Important

Hermes is an implementation agent, not the product architect.

If implementation conflicts with the project architecture:
STOP and report the conflict rather than silently redefining the architecture.
