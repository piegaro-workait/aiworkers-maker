import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { AIWorker } from '@/lib/types';

export async function GET() {
  const { data, error } = await supabase.from('workers').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data as AIWorker[]);
}

export async function POST(req: Request) {
  const body: AIWorker = await req.json();
  const { data, error } = await supabase
    .from('workers')
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as AIWorker);
}
