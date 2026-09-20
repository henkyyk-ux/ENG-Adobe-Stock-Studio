/**
 * ENG Adobe Stock Studio — AI Provider Types
 * From: ARCHITECTURE.md §Provider Independence, docs/ai-architecture.md
 *
 * Conceptual interface for all AI providers:
 * - generateText()
 * - generateStructuredOutput()
 * - analyzeImage()
 * - generateImage()
 */

// ============================================================
// AI Task Types (from docs/ai-architecture.md)
// ============================================================
export type AITaskType =
  | 'PLAN_SERIES'
  | 'CREATE_CONCEPTS'
  | 'CHECK_DIFFERENTIATION'
  | 'BUILD_PRODUCTION_PROMPT'
  | 'ANALYZE_VISUAL'
  | 'CHECK_ORIGINALITY'
  | 'CHECK_ADOBE_COMPLIANCE'
  | 'GENERATE_METADATA'
  | 'GENERATE_IMAGE';

// ============================================================
// Provider Capabilities
// ============================================================
export interface AIProviderCapabilities {
  generateText: boolean;
  generateStructuredOutput: boolean;
  analyzeImage: boolean;
  generateImage: boolean;
}

// ============================================================
// Provider Interface
// ============================================================
export interface AIProvider {
  name: string;
  capabilities: AIProviderCapabilities;

  generateText(prompt: string, options?: GenerateOptions): Promise<AIResponse<string>>;
  generateStructuredOutput<T>(prompt: string, schema: unknown, options?: GenerateOptions): Promise<AIResponse<T>>;
  analyzeImage(imageUrl: string, prompt: string, options?: GenerateOptions): Promise<AIResponse<string>>;
  generateImage(prompt: string, options?: ImageGenerateOptions): Promise<AIResponse<ImageResult>>;
}

// ============================================================
// Options
// ============================================================
export interface GenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ImageGenerateOptions extends GenerateOptions {
  width?: number;
  height?: number;
  style?: string;
}

// ============================================================
// Responses
// ============================================================
export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  provider: string;
  model: string;
  durationMs?: number;
}

export interface ImageResult {
  imageUrl: string;
  width: number;
  height: number;
  format: string;
}
