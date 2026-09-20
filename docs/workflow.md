# Production Workflow

## A. New Series

User provides a natural-language request.

System:
1. identifies subject
2. identifies subject type
3. creates series plan
4. creates 6–10 concepts
5. stores series
6. stores concepts
7. marks concepts PLANNED

No image is generated at this stage.

## B. Generate Asset

User selects an asset or uses GENERATE NEXT.

System:
1. load concept
2. run differentiation validation
3. create production prompt
4. create production run
5. request image generation
6. store result
7. move asset to QC

## C. QC

Run five gates.

If all pass:
→ PASS

If fixable issue:
→ REVISE

If unsafe or fundamentally invalid:
→ REJECT

## D. Automatic Revision

Maximum 2 automatic revision cycles.

Revision should target the actual blocking issue.

Never randomly regenerate without changing the relevant production instruction.

## E. Finalization

After PASS:
- mark final asset
- preserve production history
- prepare metadata
- classify vector state accurately
- make asset available in library

## F. Blocking Failure

If the asset still fails after the maximum automatic revisions:
- stop
- record blocking issues
- display them to user
- do not endlessly regenerate
