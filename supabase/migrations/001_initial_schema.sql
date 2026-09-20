-- ============================================================
-- ENG Adobe Stock Studio — Phase 1 Initial Schema
-- Source of truth: docs/database-schema.md
-- Status values: config/status-machine.md
-- ============================================================

-- Valid status values for assets/concepts
CREATE TYPE asset_status AS ENUM (
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
  'SUBMITTED'
);

-- Valid QC gate results
CREATE TYPE qc_gate_result AS ENUM (
  'PASS',
  'REVISE',
  'REJECT',
  'PENDING'
);

-- Valid production run statuses
CREATE TYPE run_status AS ENUM (
  'PENDING',
  'RUNNING',
  'COMPLETED',
  'FAILED',
  'CANCELLED'
);

-- Valid metadata statuses
CREATE TYPE metadata_status AS ENUM (
  'PENDING',
  'GENERATED',
  'REVIEWED',
  'APPROVED'
);

-- ============================================================
-- SERIES
-- ============================================================
CREATE TABLE series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series_code TEXT NOT NULL UNIQUE,
  series_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  subject_type TEXT NOT NULL,
  description TEXT,
  status asset_status NOT NULL DEFAULT 'PLANNED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_series_status ON series(status);
CREATE INDEX idx_series_created_at ON series(created_at DESC);

-- ============================================================
-- CONCEPTS
-- ============================================================
CREATE TABLE concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series_id UUID NOT NULL REFERENCES series(id) ON DELETE CASCADE,
  asset_id TEXT NOT NULL UNIQUE,
  concept_title TEXT NOT NULL,
  pose TEXT,
  action TEXT,
  expression TEXT,
  marking_color TEXT,
  prop_interaction TEXT,
  commercial_use TEXT,
  differentiation_notes TEXT,
  differentiation_profile JSONB DEFAULT '{}',
  status asset_status NOT NULL DEFAULT 'PLANNED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_concepts_series_id ON concepts(series_id);
CREATE INDEX idx_concepts_status ON concepts(status);
CREATE INDEX idx_concepts_asset_id ON concepts(asset_id);

-- ============================================================
-- ASSETS
-- ============================================================
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series_id UUID NOT NULL REFERENCES series(id) ON DELETE CASCADE,
  concept_id UUID NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  asset_id TEXT NOT NULL UNIQUE,
  production_prompt TEXT,
  image_url TEXT,
  final_image_url TEXT,
  status asset_status NOT NULL DEFAULT 'PLANNED',
  revision_count INTEGER NOT NULL DEFAULT 0,
  qc_status TEXT DEFAULT 'PENDING',
  vector_status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assets_series_id ON assets(series_id);
CREATE INDEX idx_assets_concept_id ON assets(concept_id);
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_asset_id ON assets(asset_id);

-- ============================================================
-- PRODUCTION_RUNS
-- ============================================================
CREATE TABLE production_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  run_number INTEGER NOT NULL DEFAULT 1,
  trigger TEXT,
  provider TEXT,
  model TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  status run_status NOT NULL DEFAULT 'PENDING',
  error_code TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_production_runs_asset_id ON production_runs(asset_id);
CREATE INDEX idx_production_runs_status ON production_runs(status);

-- ============================================================
-- QC_RESULTS
-- ============================================================
CREATE TABLE qc_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  production_run_id UUID REFERENCES production_runs(id) ON DELETE SET NULL,
  visual_quality qc_gate_result DEFAULT 'PENDING',
  originality qc_gate_result DEFAULT 'PENDING',
  differentiation qc_gate_result DEFAULT 'PENDING',
  adobe_compliance qc_gate_result DEFAULT 'PENDING',
  vector_readiness qc_gate_result DEFAULT 'PENDING',
  blocking_issues JSONB DEFAULT '[]',
  final_status qc_gate_result DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_qc_results_asset_id ON qc_results(asset_id);
CREATE INDEX idx_qc_results_production_run_id ON qc_results(production_run_id);

-- ============================================================
-- METADATA
-- ============================================================
CREATE TABLE metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  keywords JSONB DEFAULT '[]',
  ai_disclosure TEXT,
  metadata_status metadata_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_metadata_asset_id ON metadata(asset_id);

-- ============================================================
-- PRODUCTION_LOGS
-- ============================================================
CREATE TABLE production_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  result TEXT,
  details JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_production_logs_asset_id ON production_logs(asset_id);
CREATE INDEX idx_production_logs_timestamp ON production_logs(timestamp DESC);

-- ============================================================
-- Updated_at trigger function
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_series_updated_at
  BEFORE UPDATE ON series
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_concepts_updated_at
  BEFORE UPDATE ON concepts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at
  BEFORE UPDATE ON assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metadata_updated_at
  BEFORE UPDATE ON metadata
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
