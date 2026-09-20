# AI Provider Configuration

Providers:
- Ollama
- OpenRouter
- OpenAI
- future providers

Suggested environment variables:

APP_ENV
APP_URL

SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY

AI_PROVIDER
IMAGE_GENERATION_PROVIDER

OLLAMA_BASE_URL
OLLAMA_MODEL

OPENROUTER_API_KEY
OPENROUTER_MODEL

OPENAI_API_KEY
OPENAI_MODEL

PLANNER_MODEL
QC_MODEL
METADATA_MODEL

MAX_AUTO_REVISIONS=2

Rules:
- secrets server-side
- never commit .env
- provider selection belongs in configuration/orchestration
