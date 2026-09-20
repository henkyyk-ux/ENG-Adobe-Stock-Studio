# API Contract Blueprint

## Series

POST /api/series
Create a series.

GET /api/series
List series.

GET /api/series/:id
Get series and concepts.

## Concepts

POST /api/concepts
Create concept.

GET /api/series/:id/concepts
List concepts.

POST /api/concepts/:id/validate
Run differentiation validation.

## Production

POST /api/production/generate
Generate selected asset.

POST /api/production/next
Generate next eligible concept.

POST /api/production/revise
Run a revision.

GET /api/production/status/:assetId
Get production state.

## QC

POST /api/qc/run
Run QC.

GET /api/qc/:assetId
Get latest QC.

## Metadata

POST /api/metadata/generate
Generate metadata.

## Assets

GET /api/assets
List/filter assets.

GET /api/assets/:id
Get asset detail.

## Logs

GET /api/logs/:assetId
Get production history.

## Export

GET /api/export/csv
Export metadata/assets.

GET /api/export/xlsx
Export metadata/assets.

## API Rules

All input is validated.

AI outputs are schema validated.

Errors use structured responses.

No provider secret is exposed to clients.
