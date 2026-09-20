/**
 * ENG Adobe Stock Studio — Structured Error Handling
 * From: Phase 1 Master Instruction §30
 */

import { ERROR_CODES, type ErrorCode } from './constants';

export interface ApiError {
  error: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export function createError(
  code: ErrorCode,
  message: string,
  details?: Record<string, unknown>
): ApiError {
  return { error: code, message, details };
}

export function validationError(message: string, details?: Record<string, unknown>): ApiError {
  return createError(ERROR_CODES.VALIDATION_ERROR, message, details);
}

export function notFoundError(resource: string): ApiError {
  return createError(ERROR_CODES.NOT_FOUND, `${resource} not found`);
}

export function conflictError(message: string): ApiError {
  return createError(ERROR_CODES.CONFLICT, message);
}

export function invalidStateError(message: string): ApiError {
  return createError(ERROR_CODES.INVALID_STATE, message);
}

export function databaseError(message: string): ApiError {
  // Never expose internal details to client
  console.error('[DATABASE_ERROR]', message);
  return createError(ERROR_CODES.DATABASE_ERROR, 'A database error occurred');
}

export function providerUnavailableError(provider: string): ApiError {
  return createError(ERROR_CODES.PROVIDER_UNAVAILABLE, `Provider ${provider} is not available`);
}

export function configurationError(message: string): ApiError {
  return createError(ERROR_CODES.CONFIGURATION_ERROR, message);
}

export function errorResponse(error: ApiError, status: number = 400): Response {
  return new Response(JSON.stringify(error), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
