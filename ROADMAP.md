# Roadmap

## Phase 1 — Foundation

Deliver:
- project structure
- Supabase schema
- dashboard shell
- series list
- series detail
- concept table
- production queue
- asset detail shell
- production log shell
- workflow state model
- provider abstraction interfaces
- logging foundation

Explicitly NOT included:
- image generation
- automatic visual QC
- automatic revision
- AI metadata
- vectorization
- Adobe upload
- full authentication UI
- batch generation
- complex job queues
- advanced analytics
- multi-provider orchestration beyond foundation adapters

Done when:
NEW SERIES
→ CREATE SERIES
→ CREATE CONCEPT
→ SAVE
→ DISPLAY
→ PRODUCTION QUEUE
→ ASSET DETAIL
→ LOG
works without image generation.

## Phase 2 — Series Planner

Input:
"I want to make dog vectors."

Output:
structured series plan with 6–10 meaningful concepts.

## Phase 3 — Concept + Differentiation

Implement:
- subject-specific concept logic
- duplicate similarity checks
- differentiation profile
- concept revision before generation

## Phase 4 — Production Prompt Engine

Implement layered prompt construction.

## Phase 5 — Image Generation

Implement replaceable image provider.

## Phase 6 — Automatic QC

Implement five QC gates and structured results.

## Phase 7 — Library + Logs

Implement asset browsing, filtering, run history, production logs.

## Phase 8 — Metadata + Export

Implement:
- title
- description
- keywords
- AI disclosure metadata
- CSV
- XLSX
- JSON

## Phase 9 — Security

Implement:
- authentication
- RLS
- authorization
- secret hardening
- audit controls

## Phase 10 — Deployment

Implement:
- production deployment
- smoke tests
- integration tests
- workflow tests
- provider failure tests
- revision-loop tests
