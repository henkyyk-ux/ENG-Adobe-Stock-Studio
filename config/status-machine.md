# Status Machine

PLANNED
→ GENERATING
→ QC
→ PASS

QC
→ REVISE
→ GENERATING

QC
→ REJECTED

PASS
→ VECTOR_READY
→ SUBMISSION_READY

VECTOR_READY
→ VECTOR_PRODUCTION
→ VECTOR_QC
→ VECTOR_COMPLETE

Rules:
- automatic revision maximum 2
- every transition is logged
- invalid transitions are rejected
- UI may simplify status labels
