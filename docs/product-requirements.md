# Product Requirements

## Primary User Story

As a stock-content producer, I want to describe a subject and have the system plan a commercially useful series, generate differentiated concepts, produce assets, automatically inspect them, revise failures, maintain production history, and prepare metadata.

## Series Requirements

Each series contains:
- Series ID
- Series Name
- Subject Type
- 6–10 meaningful concepts

Each concept contains:
- Asset ID
- Concept Title
- Pose / Orientation
- Action / Function
- Expression when relevant
- Marking / Color
- Prop / Interaction
- Commercial Use
- Differentiation Notes

## Asset Requirements

Each asset should retain:
- concept
- production prompt
- image URL
- final image URL
- status
- revision count
- QC status
- vector status
- timestamps

## QC Requirements

Every production asset can be evaluated through:
- visual quality
- originality/IP
- differentiation
- Adobe compliance
- vector readiness

## User Commands

NEW SERIES
GENERATE
GENERATE NEXT
SHOW NEXT
PRODUCTION LOG
CHECK
REVISE
CONTINUE
