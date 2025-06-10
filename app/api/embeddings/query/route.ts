import { supabase } from '@/lib/supabaseClient'
import OpenAI from 'openai'

const openai = new OpenAI()

export async function POST(req: Request) {
  const { query } = await req.json()
  const embeddingRes = await openai.embeddings.create({ model: 'text-embedding-3-small', input: query })
  const queryVector = embeddingRes.data[0].embedding
  const { data, error } = await supabase.rpc('match_embeddings', { query_embedding: queryVector, match_count: 5 })
  if (error) return new Response('Error querying embeddings', { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
}
