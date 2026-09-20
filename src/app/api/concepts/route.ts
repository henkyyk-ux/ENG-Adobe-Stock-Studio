/**
 * API: POST /api/concepts — Create concept
 * From: docs/api-contract.md
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { CreateConceptSchema, parseInput } from '@/lib/validation';
import { validationError, databaseError, notFoundError, conflictError, errorResponse } from '@/lib/errors';
import { createProductionLog } from '@/lib/workflow';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = parseInput(CreateConceptSchema, body);

    if (!parsed.success) {
      return errorResponse(validationError('Invalid input', { fields: parsed.errors }), 400);
    }

    const supabase = getServerSupabase();

    // Verify series exists
    const { data: series, error: seriesError } = await supabase
      .from('series')
      .select('id')
      .eq('id', parsed.data.series_id)
      .single();

    if (seriesError || !series) {
      return errorResponse(notFoundError('Series'), 404);
    }

    // Check for duplicate asset_id
    const { data: existing } = await supabase
      .from('concepts')
      .select('id')
      .eq('asset_id', parsed.data.asset_id)
      .single();

    if (existing) {
      return errorResponse(conflictError(`Asset ID "${parsed.data.asset_id}" already exists`), 409);
    }

    const { data, error } = await supabase
      .from('concepts')
      .insert({
        series_id: parsed.data.series_id,
        asset_id: parsed.data.asset_id,
        concept_title: parsed.data.concept_title,
        pose: parsed.data.pose,
        action: parsed.data.action,
        expression: parsed.data.expression,
        marking_color: parsed.data.marking_color,
        prop_interaction: parsed.data.prop_interaction,
        commercial_use: parsed.data.commercial_use,
        differentiation_notes: parsed.data.differentiation_notes,
        differentiation_profile: parsed.data.differentiation_profile,
        status: 'PLANNED',
      })
      .select()
      .single();

    if (error) {
      return errorResponse(databaseError(error.message), 500);
    }

    await createProductionLog(null, 'CONCEPT_CREATED', 'success', {
      concept_id: data.id,
      asset_id: data.asset_id,
      series_id: parsed.data.series_id,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('[API] POST /api/concepts error:', err);
    return errorResponse(databaseError('Internal error'), 500);
  }
}
