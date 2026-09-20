/**
 * ENG Adobe Stock Studio — OpenAI Adapter (Stub)
 * Phase 1: Interface only. Returns PROVIDER_UNAVAILABLE.
 */

import type { AIProvider, AIProviderCapabilities, AIResponse, GenerateOptions, ImageGenerateOptions, ImageResult } from './types';

export class OpenAIAdapter implements AIProvider {
  name = 'openai';

  capabilities: AIProviderCapabilities = {
    generateText: true,
    generateStructuredOutput: true,
    analyzeImage: true,
    generateImage: true,
  };

  async generateText(_prompt: string, _options?: GenerateOptions): Promise<AIResponse<string>> {
    return {
      success: false,
      error: 'OpenAI provider not available in Phase 1',
      provider: this.name,
      model: process.env.OPENAI_MODEL || 'not-configured',
    };
  }

  async generateStructuredOutput<T>(_prompt: string, _schema: unknown, _options?: GenerateOptions): Promise<AIResponse<T>> {
    return {
      success: false,
      error: 'OpenAI provider not available in Phase 1',
      provider: this.name,
      model: process.env.OPENAI_MODEL || 'not-configured',
    };
  }

  async analyzeImage(_imageUrl: string, _prompt: string, _options?: GenerateOptions): Promise<AIResponse<string>> {
    return {
      success: false,
      error: 'OpenAI provider not available in Phase 1',
      provider: this.name,
      model: process.env.OPENAI_MODEL || 'not-configured',
    };
  }

  async generateImage(_prompt: string, _options?: ImageGenerateOptions): Promise<AIResponse<ImageResult>> {
    return {
      success: false,
      error: 'OpenAI provider not available in Phase 1',
      provider: this.name,
      model: process.env.OPENAI_MODEL || 'not-configured',
    };
  }
}
