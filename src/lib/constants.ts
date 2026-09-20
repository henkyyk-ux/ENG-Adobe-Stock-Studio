/**
 * ENG Adobe Stock Studio — Constants
 * Source: config/status-machine.md, docs/database-schema.md
 */

// ============================================================
// Asset/Concept Status Values
// From: docs/database-schema.md Status Vocabulary
// ============================================================
export const ASSET_STATUSES = [
  'PLANNED',
  'GENERATING',
  'QC',
  'REVISING',
  'PASS',
  'REVISE',
  'REJECTED',
  'VECTOR_READY',
  'VECTOR_PRODUCTION',
  'VECTOR_QC',
  'VECTOR_COMPLETE',
  'SUBMISSION_READY',
  'SUBMITTED',
] as const;

export type AssetStatus = typeof ASSET_STATUSES[number];

// ============================================================
// Status Transitions
// From: config/status-machine.md
// ============================================================
export const STATUS_TRANSITIONS: Record<AssetStatus, AssetStatus[]> = {
  PLANNED: ['GENERATING'],
  GENERATING: ['QC'],
  QC: ['PASS', 'REVISE', 'REJECTED'],
  REVISING: ['GENERATING'],
  PASS: ['VECTOR_READY', 'SUBMISSION_READY'],
  REVISE: ['GENERATING'],
  REJECTED: [],
  VECTOR_READY: ['VECTOR_PRODUCTION'],
  VECTOR_PRODUCTION: ['VECTOR_QC'],
  VECTOR_QC: ['VECTOR_COMPLETE'],
  VECTOR_COMPLETE: ['SUBMISSION_READY'],
  SUBMISSION_READY: ['SUBMITTED'],
  SUBMITTED: [],
};

// ============================================================
// Production Run Statuses
// ============================================================
export const RUN_STATUSES = [
  'PENDING',
  'RUNNING',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
] as const;

export type RunStatus = typeof RUN_STATUSES[number];

// ============================================================
// QC Gate Results
// ============================================================
export const QC_GATE_RESULTS = [
  'PASS',
  'REVISE',
  'REJECT',
  'PENDING',
] as const;

export type QcGateResult = typeof QC_GATE_RESULTS[number];

// ============================================================
// Metadata Statuses
// ============================================================
export const METADATA_STATUSES = [
  'PENDING',
  'GENERATED',
  'REVIEWED',
  'APPROVED',
] as const;

export type MetadataStatus = typeof METADATA_STATUSES[number];

// ============================================================
// UI Status Labels
// From: docs/ui-ux.md
// ============================================================
export const UI_STATUS_LABELS: Record<AssetStatus, string> = {
  PLANNED: 'Planned',
  GENERATING: 'Generating',
  QC: 'Checking',
  REVISING: 'Revising',
  PASS: 'Passed',
  REVISE: 'Needs Revision',
  REJECTED: 'Rejected',
  VECTOR_READY: 'Vector Ready',
  VECTOR_PRODUCTION: 'Vector Production',
  VECTOR_QC: 'Vector QC',
  VECTOR_COMPLETE: 'Vector Complete',
  SUBMISSION_READY: 'Ready',
  SUBMITTED: 'Submitted',
};

// ============================================================
// Status Colors for UI
// ============================================================
export const STATUS_COLORS: Record<AssetStatus, string> = {
  PLANNED: '#6b7280',
  GENERATING: '#f59e0b',
  QC: '#3b82f6',
  REVISING: '#f97316',
  PASS: '#10b981',
  REVISE: '#ef4444',
  REJECTED: '#dc2626',
  VECTOR_READY: '#8b5cf6',
  VECTOR_PRODUCTION: '#a855f7',
  VECTOR_QC: '#7c3aed',
  VECTOR_COMPLETE: '#6d28d9',
  SUBMISSION_READY: '#059669',
  SUBMITTED: '#047857',
};

// ============================================================
// Error Codes
// ============================================================
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INVALID_STATE: 'INVALID_STATE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  PROVIDER_UNAVAILABLE: 'PROVIDER_UNAVAILABLE',
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// ============================================================
// Workflow Constants
// From: PROJECT.md, ARCHITECTURE.md
// ============================================================
export const MAX_AUTO_REVISIONS = 2;

// ============================================================
// Subject Types
// From: config/subject-rules.md
// ============================================================
export const SUBJECT_TYPES = [
  'Animal',
  'Tool',
  'Object',
  'Food',
  'Vehicle',
  'Other',
] as const;

export type SubjectType = typeof SUBJECT_TYPES[number];
