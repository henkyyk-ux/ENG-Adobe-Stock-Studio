/**
 * ENG Adobe Stock Studio — Input Validation Schemas
 * All API input must be validated (Phase 1 Master Instruction §12).
 * Uses Zod for schema validation.
 */

import { z } from 'zod';
import { ASSET_STATUSES, RUN_STATUSES, SUBJECT_TYPES } from './constants';

// ============================================================
// Series
// ============================================================
export const CreateSeriesSchema = z.object({
  series_code: z
    .string()
    .min(1, 'Series code is required')
    .max(50, 'Series code too long')
    .regex(/^[A-Z0-9-]+$/, 'Series code must be uppercase alphanumeric with hyphens'),
  series_name: z
    .string()
    .min(1, 'Series name is required')
    .max(200, 'Series name too long'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(100, 'Subject too long'),
  subject_type: z
    .string()
    .min(1, 'Subject type is required'),
  description: z
    .string()
    .max(1000, 'Description too long')
    .optional()
    .default(''),
});

export type CreateSeriesInput = z.infer<typeof CreateSeriesSchema>;

// ============================================================
// Concepts
// ============================================================
export const CreateConceptSchema = z.object({
  series_id: z
    .string()
    .uuid('Invalid series ID'),
  asset_id: z
    .string()
    .min(1, 'Asset ID is required')
    .max(50, 'Asset ID too long')
    .regex(/^[A-Z0-9-]+$/, 'Asset ID must be uppercase alphanumeric with hyphens'),
  concept_title: z
    .string()
    .min(1, 'Concept title is required')
    .max(200, 'Concept title too long'),
  pose: z.string().max(500).optional().default(''),
  action: z.string().max(500).optional().default(''),
  expression: z.string().max(500).optional().default(''),
  marking_color: z.string().max(500).optional().default(''),
  prop_interaction: z.string().max(500).optional().default(''),
  commercial_use: z.string().max(500).optional().default(''),
  differentiation_notes: z.string().max(1000).optional().default(''),
  differentiation_profile: z.record(z.unknown()).optional().default({}),
});

export type CreateConceptInput = z.infer<typeof CreateConceptSchema>;

// ============================================================
// Assets
// ============================================================
export const CreateAssetSchema = z.object({
  series_id: z
    .string()
    .uuid('Invalid series ID'),
  concept_id: z
    .string()
    .uuid('Invalid concept ID'),
  asset_id: z
    .string()
    .min(1, 'Asset ID is required')
    .max(50, 'Asset ID too long'),
});

export type CreateAssetInput = z.infer<typeof CreateAssetSchema>;

// ============================================================
// Production Runs
// ============================================================
export const CreateProductionRunSchema = z.object({
  asset_id: z
    .string()
    .uuid('Invalid asset ID'),
  trigger: z.string().max(100).optional().default('manual'),
  provider: z.string().max(100).optional().default('none'),
  model: z.string().max(100).optional().default('none'),
});

export type CreateProductionRunInput = z.infer<typeof CreateProductionRunSchema>;

// ============================================================
// Production Logs
// ============================================================
export const CreateProductionLogSchema = z.object({
  asset_id: z
    .string()
    .uuid('Invalid asset ID')
    .optional(),
  action: z
    .string()
    .min(1, 'Action is required')
    .max(200, 'Action too long'),
  result: z.string().max(200).optional().default(''),
  details: z.record(z.unknown()).optional().default({}),
});

export type CreateProductionLogInput = z.infer<typeof CreateProductionLogSchema>;

// ============================================================
// Status Validation
// ============================================================
export const AssetStatusSchema = z.enum(ASSET_STATUSES);
export const RunStatusSchema = z.enum(RUN_STATUSES);

// ============================================================
// Helper: parse and return typed errors
// ============================================================
export function parseInput<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: true;
  data: T;
} | {
  success: false;
  errors: { field: string; message: string }[];
} {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    errors: result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    })),
  };
}
