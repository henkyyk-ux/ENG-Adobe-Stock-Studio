# Development Rules

## Rule 1 — Architecture Before Code

Before implementing a phase:
1. inspect current repository
2. compare against architecture
3. identify conflicts
4. list files to create/change
5. define tests
6. only then implement

## Rule 2 — Do Not Invent Requirements

If a requirement is unclear:
- identify the ambiguity
- choose the smallest maintainable interpretation when safe
- do not introduce unrelated features

## Rule 3 — Preserve Existing Work

Do not delete working features without explicit justification.

Prefer additive, backward-compatible changes.

## Rule 4 — Complete Files

When delivering replacement files to a non-expert user, prefer complete files over fragments.

## Rule 5 — Test Every Phase

Each phase must have a concrete acceptance test.

## Rule 6 — No Fake Capabilities

Never claim:
- vectorization happened when it did not
- QC passed when it was not executed
- Adobe compliance was verified when it was not checked
- an image provider generated an asset when it did not
- a file was uploaded when it was not

## Rule 7 — Structured AI Output

AI outputs must be schema-validated before entering the database.

Never let free-form model text directly control production state.

## Rule 8 — Database Is Source of Truth

UI state is not production truth.

Workflow state must be persisted.

## Rule 9 — Provider Independence

No workflow logic should depend on a specific AI vendor.

## Rule 10 — Cost Control

- avoid invalid generation
- avoid duplicate generation
- cache where appropriate
- limit automatic revisions to 2
- avoid repeated QC when not needed
- record provider/model information for future cost analysis

## Rule 11 — Secrets

Never commit:
.env
API keys
service-role credentials
tokens
private credentials

## Rule 12 — Git

Before committing:
- inspect diff
- run relevant tests
- verify no secrets
- describe changed behavior
