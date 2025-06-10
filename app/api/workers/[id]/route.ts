import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from('workers').select('*').eq('id', params.id).single()
  if (error) return new Response('Error fetching worker', { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = await req.json()
  const { error } = await supabase.from('workers').update(payload).eq('id', params.id)
  if (error) return new Response('Error updating worker', { status: 500 })
  return new Response('ok')
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await supabase.from('workers').delete().eq('id', params.id)
  if (error) return new Response('Error deleting worker', { status: 500 })
  return new Response('ok')
}
