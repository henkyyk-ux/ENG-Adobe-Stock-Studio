/**
 * API: GET /api/series/:id/concepts — List concepts for a series
 * From: docs/api-contract.md
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { notFoundError, databaseError, errorResponse } from '@/lib/errors';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getServerSupabase();

    // Verify series exists
    const { data: series, error: seriesError } = await supabase
      .from('series')
      .select('id')
      .eq('id', id)
      .single();

    if (seriesError || !series) {
      return errorResponse(notFoundError('Series'), 404);
    }

    const { data: concepts, error } = await supabase
      .from('concepts')
      .select('*')
      .eq('series_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      return errorResponse(databaseError(error.message), 500);
    }

    return NextResponse.json(concepts || []);
  } catch (err) {
    console.error('[API] GET /api/series/:id/concepts error:', err);
    return errorResponse(databaseError('Internal error'), 500);
  }
}
