import { NextResponse } from 'next/server';

import supabase from '@config/supabase';

export async function GET() {
  const { data, status } = await supabase.from('questions').select('created_at').limit(1);
  if (status === 200) {
    return NextResponse.json({ success: true, message: 'Wake up successful', data });
  } else {
    return new Response(JSON.stringify({ success: false, error: 'Wake up failed' }), {
      status
    });
  }
}
