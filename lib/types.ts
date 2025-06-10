export interface AIWorker {
  id?: string;
  created_at?: string;
  name: string;
  description?: string;
  instructions: string;
  model: string;
  temperature?: number;
  tools?: string[];
}
