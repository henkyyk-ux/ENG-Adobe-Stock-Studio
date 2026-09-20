/**
 * API: POST /api/series — Create series
 *      GET  /api/series — List series
 * From: docs/api-contract.md
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { CreateSeriesSchema, parseInput } from '@/lib/validation';
import { validationError, databaseError, conflictError, errorResponse } from '@/lib/errors';
import { createProductionLog } from '@/lib/workflow';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = parseInput(CreateSeriesSchema, body);

    if (!parsed.success) {
      return errorResponse(validationError('Invalid input', { fields: parsed.errors }), 400);
    }

    const supabase = getServerSupabase();

    // Check for duplicate series_code
    const { data: existing } = await supabase
      .from('series')
      .select('id')
      .eq('series_code', parsed.data.series_code)
      .single();

    if (existing) {
      return errorResponse(conflictError(`Series code "${parsed.data.series_code}" already exists`), 409);
    }

    const { data, error } = await supabase
      .from('series')
      .insert({
        series_code: parsed.data.series_code,
        series_name: parsed.data.series_name,
        subject: parsed.data.subject,
        subject_type: parsed.data.subject_type,
        description: parsed.data.description,
        status: 'PLANNED',
      })
      .select()
      .single();

    if (error) {
      return errorResponse(databaseError(error.message), 500);
    }

    // Log the creation
    await createProductionLog(null, 'SERIES_CREATED', 'success', {
      series_id: data.id,
      series_code: data.series_code,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('[API] POST /api/series error:', err);
    return errorResponse(databaseError('Internal error'), 500);
  }
}

export async function GET() {
  try {
    const supabase = getServerSupabase();

    const { data, error } = await supabase
      .from('series')
      .select(`
        *,
        concepts:concepts(count)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return errorResponse(databaseError(error.message), 500);
    }

    // Transform count
    const series = (data || []).map((s: Record<string, unknown>) => ({
      ...s,
      concept_count: Array.isArray(s.concepts) ? (s.concepts[0] as Record<string, number>)?.count || 0 : 0,
    }));

    return NextResponse.json(series);
  } catch (err) {
    console.error('[API] GET /api/series error:', err);
    return errorResponse(databaseError('Internal error'), 500);
  }
}
