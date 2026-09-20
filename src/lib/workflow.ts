/**
 * ENG Adobe Stock Studio — Workflow Engine Foundation
 * From: ARCHITECTURE.md, config/status-machine.md, docs/workflow.md
 *
 * The workflow engine owns:
 * - production state
 * - sequencing
 * - revision limits
 * - transitions
 * - failure handling
 * - logging
 *
 * The UI must NOT directly manipulate database workflow state
 * without going through this engine.
 */

import { STATUS_TRANSITIONS, MAX_AUTO_REVISIONS, type AssetStatus } from './constants';
import { getServerSupabase } from './supabase';

// ============================================================
// Status Transition Validation
// ============================================================
export function isValidTransition(from: AssetStatus, to: AssetStatus): boolean {
  const allowed = STATUS_TRANSITIONS[from];
  return allowed ? allowed.includes(to) : false;
}

export function getAllowedTransitions(status: AssetStatus): AssetStatus[] {
  return STATUS_TRANSITIONS[status] || [];
}

// ============================================================
// Workflow: Create Production Log Entry
// ============================================================
export async function createProductionLog(
  assetId: string | null,
  action: string,
  result: string,
  details: Record<string, unknown> = {}
): Promise<void> {
  const supabase = getServerSupabase();
  const { error } = await supabase.from('production_logs').insert({
    asset_id: assetId,
    action,
    result,
    details,
  });

  if (error) {
    console.error('[WORKFLOW] Failed to create production log:', error.message);
  }
}

// ============================================================
// Workflow: Create Asset Placeholder
// Phase 1: No image generation. Creates PLANNED asset.
// ============================================================
export async function createAssetPlaceholder(
  seriesId: string,
  conceptId: string,
  assetId: string
): Promise<{ success: boolean; data?: Record<string, unknown>; error?: string }> {
  const supabase = getServerSupabase();

  // Verify series exists
  const { data: series, error: seriesError } = await supabase
    .from('series')
    .select('id')
    .eq('id', seriesId)
    .single();

  if (seriesError || !series) {
    return { success: false, error: 'Series not found' };
  }

  // Verify concept exists and belongs to this series
  const { data: concept, error: conceptError } = await supabase
    .from('concepts')
    .select('id, series_id')
    .eq('id', conceptId)
    .single();

  if (conceptError || !concept) {
    return { success: false, error: 'Concept not found' };
  }

  if (concept.series_id !== seriesId) {
    return { success: false, error: 'Concept does not belong to specified series' };
  }

  // Check for duplicate asset_id
  const { data: existing } = await supabase
    .from('assets')
    .select('id')
    .eq('asset_id', assetId)
    .single();

  if (existing) {
    return { success: false, error: `Asset ID "${assetId}" already exists` };
  }

  // Create asset placeholder with PLANNED status
  const { data: asset, error: insertError } = await supabase
    .from('assets')
    .insert({
      series_id: seriesId,
      concept_id: conceptId,
      asset_id: assetId,
      status: 'PLANNED',
      revision_count: 0,
      qc_status: 'PENDING',
      vector_status: 'PENDING',
    })
    .select()
    .single();

  if (insertError) {
    console.error('[WORKFLOW] Asset creation failed:', insertError.message);
    return { success: false, error: 'Failed to create asset' };
  }

  // Log the workflow action
  await createProductionLog(asset.id, 'ASSET_CREATED', 'success', {
    asset_id: assetId,
    series_id: seriesId,
    concept_id: conceptId,
    status: 'PLANNED',
  });

  return { success: true, data: asset };
}

// ============================================================
// Workflow: Create Production Run
// Phase 1: Creates a placeholder run. No real generation.
// ============================================================
export async function createProductionRun(
  assetUuid: string,
  trigger: string = 'manual',
  provider: string = 'none',
  model: string = 'none'
): Promise<{ success: boolean; data?: Record<string, unknown>; error?: string }> {
  const supabase = getServerSupabase();

  // Verify asset exists
  const { data: asset, error: assetError } = await supabase
    .from('assets')
    .select('id, asset_id, revision_count, status')
    .eq('id', assetUuid)
    .single();

  if (assetError || !asset) {
    return { success: false, error: 'Asset not found' };
  }

  // Determine run number
  const { count } = await supabase
    .from('production_runs')
    .select('id', { count: 'exact', head: true })
    .eq('asset_id', assetUuid);

  const runNumber = (count || 0) + 1;

  // Check revision limit
  if (asset.revision_count >= MAX_AUTO_REVISIONS && trigger === 'auto_revision') {
    return {
      success: false,
      error: `Maximum automatic revisions (${MAX_AUTO_REVISIONS}) reached. Manual intervention required.`,
    };
  }

  // Create production run (Phase 1: placeholder — no real generation)
  const { data: run, error: insertError } = await supabase
    .from('production_runs')
    .insert({
      asset_id: assetUuid,
      run_number: runNumber,
      trigger,
      provider,
      model,
      started_at: new Date().toISOString(),
      status: 'PENDING',
    })
    .select()
    .single();

  if (insertError) {
    console.error('[WORKFLOW] Production run creation failed:', insertError.message);
    return { success: false, error: 'Failed to create production run' };
  }

  // Log the workflow action
  await createProductionLog(assetUuid, 'PRODUCTION_RUN_CREATED', 'success', {
    run_id: run.id,
    run_number: runNumber,
    trigger,
    provider,
    model,
    note: 'Phase 1 placeholder — no image generation',
  });

  return { success: true, data: run };
}

// ============================================================
// Workflow: Transition Status
// ============================================================
export async function transitionAssetStatus(
  assetUuid: string,
  newStatus: AssetStatus
): Promise<{ success: boolean; error?: string }> {
  const supabase = getServerSupabase();

  const { data: asset, error: fetchError } = await supabase
    .from('assets')
    .select('id, status, asset_id')
    .eq('id', assetUuid)
    .single();

  if (fetchError || !asset) {
    return { success: false, error: 'Asset not found' };
  }

  const currentStatus = asset.status as AssetStatus;

  if (!isValidTransition(currentStatus, newStatus)) {
    return {
      success: false,
      error: `Invalid status transition: ${currentStatus} → ${newStatus}. Allowed: ${getAllowedTransitions(currentStatus).join(', ') || 'none'}`,
    };
  }

  const { error: updateError } = await supabase
    .from('assets')
    .update({ status: newStatus })
    .eq('id', assetUuid);

  if (updateError) {
    console.error('[WORKFLOW] Status transition failed:', updateError.message);
    return { success: false, error: 'Failed to update status' };
  }

  await createProductionLog(assetUuid, 'STATUS_TRANSITION', 'success', {
    from: currentStatus,
    to: newStatus,
    asset_id: asset.asset_id,
  });

  return { success: true };
}
