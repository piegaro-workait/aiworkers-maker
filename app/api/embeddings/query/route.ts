import OpenAI from 'openai';
import { supabase } from '@/lib/supabaseClient';

const openai = new OpenAI();

export async function POST(request: Request) {
  const { query, datasetId, matchCount = 5 } = await request.json();

  if (!query || !datasetId) {
    return new Response(JSON.stringify({ error: 'Missing query or datasetId' }), { status: 400 });
  }

  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const [{ embedding }] = embeddingResponse.data;

  const { data, error } = await supabase.rpc('match_embeddings', {
    query_embedding: embedding,
    match_count: matchCount,
    dataset_id: datasetId,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
