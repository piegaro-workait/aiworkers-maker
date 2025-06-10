import { supabase } from '@/lib/supabaseClient'
import OpenAI from 'openai'

const openai = new OpenAI()

export async function POST(req: Request) {
  const { content } = await req.json()
  const embeddingRes = await openai.embeddings.create({ model: 'text-embedding-3-small', input: content })
  const vector = embeddingRes.data[0].embedding
  const { error } = await supabase.from('embeddings').insert({ content, embedding: vector })
  if (error) return new Response('Error storing embedding', { status: 500 })
  return new Response('ok')
}
