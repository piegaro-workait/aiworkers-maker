import { randomUUID } from 'crypto';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabaseClient';

const openai = new OpenAI();

export async function POST(request: Request) {
  const { text, datasetId } = await request.json();

  if (!text) {
    return new Response(JSON.stringify({ error: 'Missing text' }), { status: 400 });
  }

  const finalDatasetId = datasetId || randomUUID();

  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  const [{ embedding }] = embeddingResponse.data;

  const { error } = await supabase.from('embeddings').insert({
    dataset_id: finalDatasetId,
    content: text,
    embedding,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ datasetId: finalDatasetId }), { status: 200 });
}
