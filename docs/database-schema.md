# Database Schema Blueprint

## series

id
series_code
series_name
subject
subject_type
description
status
created_at
updated_at

## concepts

id
series_id
asset_id
concept_title
pose
action
expression
marking_color
prop_interaction
commercial_use
differentiation_notes
differentiation_profile JSONB
status
created_at
updated_at

## assets

id
series_id
concept_id
asset_id
production_prompt
image_url
final_image_url
status
revision_count
qc_status
vector_status
created_at
updated_at

## production_runs

id
asset_id
run_number
trigger
provider
model
started_at
completed_at
status
error_code
error_message
created_at

## qc_results

id
asset_id
production_run_id
visual_quality
originality
differentiation
adobe_compliance
vector_readiness
blocking_issues JSONB
final_status
created_at

## metadata

id
asset_id
title
description
keywords JSONB
ai_disclosure
metadata_status
created_at
updated_at

## production_logs

id
asset_id
action
result
details JSONB
timestamp

## Status Vocabulary

PLANNED
GENERATING
QC
REVISING
PASS
REVISE
REJECTED
VECTOR_READY
VECTOR_PRODUCTION
VECTOR_QC
VECTOR_COMPLETE
SUBMISSION_READY
SUBMITTED

UI should simplify these statuses where appropriate.

## Important

production_runs is the execution history.

revision_count alone must never be treated as complete history.
