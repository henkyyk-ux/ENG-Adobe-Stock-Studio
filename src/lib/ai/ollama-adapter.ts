/**
 * ENG Adobe Stock Studio — Ollama Adapter (Stub)
 * Phase 1: Interface only. Returns PROVIDER_UNAVAILABLE.
 * Real implementation in future phases.
 */

import type { AIProvider, AIProviderCapabilities, AIResponse, GenerateOptions, ImageGenerateOptions, ImageResult } from './types';

export class OllamaAdapter implements AIProvider {
  name = 'ollama';

  capabilities: AIProviderCapabilities = {
    generateText: true,
    generateStructuredOutput: true,
    analyzeImage: false,
    generateImage: false,
  };

  async generateText(_prompt: string, _options?: GenerateOptions): Promise<AIResponse<string>> {
    return {
      success: false,
      error: 'Ollama provider not available in Phase 1',
      provider: this.name,
      model: process.env.OLLAMA_MODEL || 'not-configured',
    };
  }

  async generateStructuredOutput<T>(_prompt: string, _schema: unknown, _options?: GenerateOptions): Promise<AIResponse<T>> {
    return {
      success: false,
      error: 'Ollama provider not available in Phase 1',
      provider: this.name,
      model: process.env.OLLAMA_MODEL || 'not-configured',
    };
  }

  async analyzeImage(_imageUrl: string, _prompt: string, _options?: GenerateOptions): Promise<AIResponse<string>> {
    return {
      success: false,
      error: 'Ollama does not support image analysis',
      provider: this.name,
      model: process.env.OLLAMA_MODEL || 'not-configured',
    };
  }

  async generateImage(_prompt: string, _options?: ImageGenerateOptions): Promise<AIResponse<ImageResult>> {
    return {
      success: false,
      error: 'Ollama does not support image generation',
      provider: this.name,
      model: process.env.OLLAMA_MODEL || 'not-configured',
    };
  }
}
