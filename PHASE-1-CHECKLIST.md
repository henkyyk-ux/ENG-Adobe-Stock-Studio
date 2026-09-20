# Phase 1 Acceptance Checklist

## Repository
- [ ] clean project structure
- [ ] package configuration
- [ ] environment template
- [ ] README
- [ ] lint/test scripts

## Database
- [ ] series table
- [ ] concepts table
- [ ] assets table
- [ ] production_runs table
- [ ] qc_results table
- [ ] metadata table
- [ ] production_logs table
- [ ] indexes
- [ ] timestamps
- [ ] constraints

## UI
- [ ] dashboard
- [ ] series list
- [ ] series detail
- [ ] concept table
- [ ] production queue
- [ ] asset detail
- [ ] production log

## Backend
- [ ] API structure
- [ ] validation
- [ ] error handling
- [ ] workflow state foundation
- [ ] provider abstraction

## AI
- [ ] Ollama adapter interface
- [ ] OpenRouter adapter interface
- [ ] OpenAI adapter interface
- [ ] no real image generation yet
- [ ] no automatic QC yet

## Security
- [ ] no secrets in source
- [ ] .env.example
- [ ] server-only secret boundary
- [ ] RLS design documented

## Acceptance Test

Create:
Series → Concept → Asset placeholder → Production Run → Log

All records persist in Supabase and can be viewed through the UI.
