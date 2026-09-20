# AI Architecture

## AI Roles

AI PLANNER
Creates series and concepts.

AI DIFFERENTIATION ENGINE
Checks conceptual similarity.

AI PROMPT ENGINE
Builds layered production prompts.

IMAGE GENERATOR
Produces candidate visual assets.

AI QC
Inspects generated assets.

AI METADATA
Creates submission-oriented metadata.

These roles are logically separate even if the same model executes multiple roles.

## AI Task Router

Task names:

PLAN_SERIES
CREATE_CONCEPTS
CHECK_DIFFERENTIATION
BUILD_PRODUCTION_PROMPT
ANALYZE_VISUAL
CHECK_ORIGINALITY
CHECK_ADOBE_COMPLIANCE
GENERATE_METADATA
GENERATE_IMAGE

The router chooses a provider based on:
- capability
- local/cloud policy
- configured model
- availability
- fallback rules

## Failure Strategy

If local provider unavailable:
- fallback to configured cloud provider when allowed

If cloud provider unavailable:
- return structured provider error

Never silently substitute a different task capability.

## Structured Output

Prefer JSON-schema-constrained responses.

Validate:
- required fields
- enum values
- IDs
- arrays
- status values
- max lengths

Reject malformed model output before database write.
