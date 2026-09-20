# ENG Adobe Stock Studio — Project Foundation v1

## 1. Project Identity

Project name: ENG Adobe Stock Studio

Purpose:
Build a standalone web-based AI production management system for creating, checking, organizing, and preparing original commercial assets for Adobe Stock.

The system is not merely an image generator. It is a controlled production workflow.

Core objective:

IDEA
→ SERIES PLAN
→ CONCEPTS
→ DIFFERENTIATION CHECK
→ PRODUCTION PROMPT
→ IMAGE GENERATION
→ VISUAL QC
→ ORIGINALITY/IP QC
→ COMMERCIAL DIFFERENTIATION QC
→ ADOBE COMPLIANCE QC
→ AUTO REVISION (maximum 2 cycles)
→ FINAL ASSET
→ METADATA
→ ASSET LIBRARY
→ EXPORT / SUBMISSION READY

## 2. Final Product Vision

The user should be able to say:

"I want to make dog vectors."

The system should not immediately generate an image.

It should first create a meaningful series plan with structured concepts.

Example:

Series: DOG-ANIMAL-ACTION
Concepts:
DOG-01 — Running
DOG-02 — Fetching
DOG-03 — Guarding
DOG-04 — Greeting
DOG-05 — Sleeping
DOG-06 — Stretching

Then the user can say:

"Generate DOG-01"

or:

"Generate Next"

The system manages the production workflow automatically.

## 3. Core Principle

SAME VISUAL LANGUAGE, DIFFERENT STRUCTURAL LOGIC.

Visual consistency must exist across the collection, but every subject must use its own recognizable construction logic.

Animals:
- anatomy
- body proportions
- limbs
- ears
- tail
- posture
- facial expression

Tools:
- handles
- joints
- mechanical geometry
- functional contact points
- construction

Objects:
- recognizable construction
- purpose
- functional geometry

Food:
- defining shape
- surface
- texture only when commercially useful

Vehicles:
- body
- wheels
- windows
- lights
- functional structure

Never force one generic concept template onto every subject category.

## 4. ENG Visual DNA

Default asset direction:

- Original 2D illustration
- Vector-oriented appearance
- Clean commercial illustration
- Strong recognizable silhouette
- Bold, controlled black outlines
- Flat solid colors
- Maximum 2 hard-edged cell-shading levels
- Clean closed shapes
- Minimal highlights
- Generous negative space
- Clean white or simple isolated background
- Commercially readable composition

Avoid:

- photorealism
- 3D rendering
- painterly rendering
- soft gradients
- airbrush effects
- excessive texture
- excessive glow
- glossy photorealistic eyes
- visual noise
- accidental cropping
- stray marks
- text unless explicitly required
- watermark
- signature
- logo unless legally required and intentionally part of the task

Characters/animals:
- simplified rounded proportions
- expressive
- commercially usable
- not excessively cute
- not childish by default
- clear silhouette
- readable pose
- strong expression when relevant

Important:
Do not make every asset the same character design.
Consistency means visual language, not identical anatomy or character identity.

## 5. Originality / IP Policy

Only original assets are allowed.

Do not intentionally reproduce or imitate:

- real people
- celebrities
- fictional characters
- existing mascots
- brands
- franchises
- copyrighted characters
- trademarks
- named artists
- artist-specific style imitation
- third-party IP
- deliberate resemblance to famous characters

If a concept appears to rely on protected identity or recognizable third-party IP, block it before image generation.

## 6. Adobe Stock Production Principles

The system must optimize for:

- originality
- meaningful differentiation
- commercial usefulness
- accurate metadata
- accurate content type
- AI disclosure requirements
- copyright/IP safety
- avoidance of spam
- avoidance of near-duplicates

Do not generate variants that differ only by:

- color
- flip
- rotation
- crop
- minor expression
- minor accessory
- tiny position change

If Adobe Stock requirements change, official Adobe documentation must be checked before treating a new rule as definitive.

## 7. Vector Rule

VECTOR_READY is not VECTOR_COMPLETE.

AI-generated raster imagery may be classified:

VECTOR_READY

only when it visually supports a later vector workflow.

VECTOR_COMPLETE may only be assigned after a genuine editable vector file has been produced and technically checked.

Never claim vectorization happened if no actual vector production occurred.

## 8. AI Architecture

The application owns the workflow.

AI providers are replaceable workers.

Application:

ENG Studio
→ AI Orchestrator
→ Provider Adapter
→ Ollama / OpenRouter / OpenAI / future provider

The application must never hard-code business workflow around one AI provider.

Capabilities should be abstracted:

- generateText()
- generateStructuredOutput()
- analyzeImage()
- generateImage()

## 9. Provider Strategy

Default philosophy:

LOCAL FIRST, CLOUD WHEN NEEDED.

Suggested workload:

Planner → Ollama
Concept generation → Ollama
Differentiation → Ollama
Prompt generation → Ollama
Metadata → Ollama
Visual QC → OpenRouter or OpenAI
Originality/IP QC → OpenRouter or OpenAI
Image generation → dedicated image provider abstraction

This is a starting policy, not a permanent model choice.

The provider can be changed without changing the workflow engine.

## 10. Hermes Role

Hermes is a development/automation agent.

Hermes is NOT the business workflow engine.

Hermes may:
- inspect repository
- implement approved phases
- modify code
- run tests
- debug
- explain errors
- prepare changes
- assist Git workflow
- assist deployment workflow

Hermes must not independently redefine:
- product scope
- architecture
- Adobe compliance policy
- ENG Visual DNA
- database source of truth
- production workflow

The project documentation is the source of truth.

The application must work even if Hermes is removed.

## 11. Source of Truth

Primary source of truth:

1. Database for runtime production state
2. Project configuration for rules
3. Version-controlled source code for implementation
4. Project documentation/skills for intended behavior

Chat history is not an application dependency.

ChatGPT Projects are not assumed to be an API runtime.

## 12. User Experience

Primary commands:

- NEW SERIES
- GENERATE
- GENERATE NEXT
- SHOW NEXT
- PRODUCTION LOG
- CHECK
- REVISE
- CONTINUE

The user should not have to repeat information already stored in the system.

UI should expose simple workflow concepts rather than technical implementation details.

## 13. Phase Strategy

Phase 1:
Architecture + database + UI skeleton + workflow foundation.

Phase 2:
Series Planner.

Phase 3:
Concept Management + Differentiation Engine.

Phase 4:
Production Prompt Engine.

Phase 5:
Image Generation.

Phase 6:
Automatic QC.

Phase 7:
Asset Library + Production Log.

Phase 8:
Metadata + Export.

Phase 9:
Authentication + Security Hardening.

Phase 10:
Deployment + Full Testing.

Each phase must be testable before moving to the next.

## 14. Definition of Success

The final system should allow the user to move from:

"I want to make dog vectors."

to:

A structured series
→ differentiated concepts
→ controlled generation
→ automatic QC
→ revision when required
→ final asset
→ metadata
→ production history
→ submission-ready package.

The system must favor reliability, repeatability, maintainability, and low unnecessary cost over flashy complexity.
