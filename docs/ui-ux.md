# UI / UX Blueprint

## Design Direction

ENG Adobe Stock Studio should feel like a focused production tool, not an AI chat application.

Priorities:
- clarity
- queue visibility
- low cognitive load
- obvious next action
- production history
- useful error messages

## Dashboard

Show:
- current series
- production queue
- next asset
- recent activity
- blocking issues
- simple status indicators

## Series Page

Show:
- series information
- concept table
- asset IDs
- concept status
- Generate action

## Asset Detail

Show:
- concept
- production prompt
- generated image
- QC gates
- revision count
- vector state
- production history

Actions:
- Regenerate
- Revise
- Approve
- Check
- View Log

## Production Log

Show chronological events:
- planning
- generation
- QC
- revision
- finalization
- metadata

Avoid exposing unnecessary implementation details by default.

## UI Status

Technical statuses can exist in backend while UI uses concise labels:
Planned
Generating
Checking
Needs Revision
Passed
Rejected
Ready
