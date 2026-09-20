# Architecture — ENG Adobe Stock Studio

## High-Level Flow

User
→ Web UI
→ API
→ Workflow Engine
→ AI Orchestrator
→ AI Provider
→ QC
→ Database / Storage

## Runtime Architecture

Frontend:
- lightweight HTML/CSS/JS or a small maintainable framework
- responsive dashboard
- simple production-oriented UI

Backend:
- server-side API
- workflow orchestration
- provider abstraction
- validation
- logging
- security boundaries

Database:
- Supabase PostgreSQL

Storage:
- Supabase Storage or compatible object storage

Deployment:
- Vercel or equivalent

Secrets:
- server-side environment variables only

## Core Components

### Workflow Engine

Owns:
- production state
- sequencing
- revision limits
- transitions
- failure handling
- logging

It must not depend on one model provider.

### AI Orchestrator

Selects the appropriate provider for each task.

Example:

PLAN_SERIES → Ollama
DIFFERENTIATION → Ollama
PROMPT → Ollama
VISION_QC → OpenRouter
IMAGE_GENERATION → image provider

### Differentiation Engine

Before generation, compare the candidate concept against:
- concepts in current series
- previous assets when relevant

Compare:
- pose
- orientation
- silhouette
- action
- structural logic
- use case
- prop
- expression

Color-only variation is insufficient.

### Prompt Engine

Layer rules:

1. ENG Visual DNA
2. Subject-specific structural logic
3. Concept
4. Composition
5. Technical appearance
6. Negative rules
7. Adobe compliance rules
8. Differentiation rules

Do not depend on one giant prompt as the only source of truth.

### QC Engine

Five gates:

A. Visual Quality
B. Originality / IP
C. Commercial Differentiation
D. Adobe Compliance
E. Vector Readiness

Each gate returns:
PASS / REVISE / REJECT

### Revision Manager

Automatic revisions:
- maximum 2 cycles
- only revise if blocking issue is actionable
- preserve previous run history
- never silently overwrite history

After the maximum revision count:
- stop
- show blocking issue
- require user intervention

## Architecture Diagram

User
  ↓
Dashboard
  ↓
API
  ↓
Workflow Engine
  ├── Series Planner
  ├── Differentiation Engine
  ├── Prompt Engine
  ├── Image Generator
  ├── QC Engine
  ├── Revision Manager
  └── Metadata Engine
          ↓
      AI Orchestrator
      ├── Ollama
      ├── OpenRouter
      └── OpenAI
          ↓
      Supabase / Storage

## Provider Independence

Business logic must not call provider-specific SDKs directly.

Use adapters.

Conceptual interface:

generateText()
generateStructuredOutput()
analyzeImage()
generateImage()

Each provider adapter implements only supported capabilities.

## Security

- never expose API keys to browser
- use environment variables
- use Supabase RLS when authentication is introduced
- never commit .env
- validate all API input
- validate AI structured output
- do not trust model-generated IDs or statuses
