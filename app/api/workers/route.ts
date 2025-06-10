const workers: any[] = [];

export async function GET() {
  return Response.json(workers);
}

export async function POST(req: Request) {
  const data = await req.json();
  const worker = { id: Date.now().toString(), ...data };
  workers.push(worker);
  return Response.json(worker);
}
