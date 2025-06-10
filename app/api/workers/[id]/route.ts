import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { AIWorker } from '@/lib/types';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from('workers')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as AIWorker);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body: Partial<AIWorker> = await req.json();
  const { data, error } = await supabase
    .from('workers')
    .update(body)
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as AIWorker);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase.from('workers').delete().eq('id', params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
