/**
 * ENG Adobe Stock Studio — AI Orchestrator
 * From: docs/ai-architecture.md
 *
 * The orchestrator selects the appropriate provider for each AI task.
 * Phase 1: All tasks return "not available". No real AI calls.
 */

import type { AIProvider, AITaskType } from './types';
import { OllamaAdapter } from './ollama-adapter';
import { OpenRouterAdapter } from './openrouter-adapter';
import { OpenAIAdapter } from './openai-adapter';

// ============================================================
// Task → Provider Routing
// From: docs/ai-architecture.md §AI Task Router
// ============================================================
const TASK_PROVIDER_MAP: Record<AITaskType, string> = {
  PLAN_SERIES: 'ollama',
  CREATE_CONCEPTS: 'ollama',
  CHECK_DIFFERENTIATION: 'ollama',
  BUILD_PRODUCTION_PROMPT: 'ollama',
  ANALYZE_VISUAL: 'openrouter',
  CHECK_ORIGINALITY: 'openrouter',
  CHECK_ADOBE_COMPLIANCE: 'openrouter',
  GENERATE_METADATA: 'ollama',
  GENERATE_IMAGE: 'openai', // placeholder — dedicated image provider in future
};

// ============================================================
// Provider Registry
// ============================================================
const providers: Record<string, AIProvider> = {
  ollama: new OllamaAdapter(),
  openrouter: new OpenRouterAdapter(),
  openai: new OpenAIAdapter(),
};

// ============================================================
// Public API
// ============================================================

/**
 * Get the provider for a given AI task type.
 * Falls back to configured overrides from environment.
 */
export function getProviderForTask(task: AITaskType): AIProvider {
  const configuredProvider = process.env.AI_PROVIDER;
  const providerName = configuredProvider || TASK_PROVIDER_MAP[task];
  return providers[providerName] || providers.ollama;
}

/**
 * Get a specific provider by name.
 */
export function getProvider(name: string): AIProvider | undefined {
  return providers[name];
}

/**
 * List all registered providers and their capabilities.
 */
export function listProviders(): { name: string; capabilities: AIProvider['capabilities'] }[] {
  return Object.values(providers).map((p) => ({
    name: p.name,
    capabilities: p.capabilities,
  }));
}

/**
 * Check if any provider is available for a task.
 * Phase 1: Always returns false (no real AI execution).
 */
export function isTaskAvailable(_task: AITaskType): boolean {
  // Phase 1: No AI tasks are available
  return false;
}
