const workers: any[] = [];

export async function GET() {
  return Response.json(workers);
}

export async function POST(req: Request) {
  const data = await req.json();
  const worker = { id: Date.now().toString(), ...data };
  workers.push(worker);
  return Response.json(worker);

  
import { supabase } from '@/lib/supabaseClient'
import { AIWorker } from '@/lib/types'
import { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  const { data, error } = await supabase.from('workers').select('*')
  if (error) {
    return new Response('Error fetching workers', { status: 500 })
  }
  return new Response(JSON.stringify(data), { status: 200 })
}

export async function POST(req: NextRequest) {
  const worker = (await req.json()) as AIWorker
  worker.id = uuidv4()
  const { error } = await supabase.from('workers').insert(worker)
  if (error) {
    return new Response('Error creating worker', { status: 500 })
  }
  return new Response(JSON.stringify(worker), { status: 200 })
}
