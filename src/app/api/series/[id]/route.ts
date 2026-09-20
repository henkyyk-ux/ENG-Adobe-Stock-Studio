/**
 * API: GET /api/series/:id — Get series with concepts
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

    const { data: series, error } = await supabase
      .from('series')
      .select(`
        *,
        concepts:concepts(*)
      `)
      .eq('id', id)
      .single();

    if (error || !series) {
      return errorResponse(notFoundError('Series'), 404);
    }

    return NextResponse.json(series);
  } catch (err) {
    console.error('[API] GET /api/series/:id error:', err);
    return errorResponse(databaseError('Internal error'), 500);
  }
}
