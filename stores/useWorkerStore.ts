import { create } from 'zustand';
import { AIWorker } from '@/lib/types';

interface WorkerState {
  draftWorker: Partial<AIWorker>;
  setDraftWorker: (worker: Partial<AIWorker>) => void;
  updateDraftWorker: (data: Partial<AIWorker>) => void;
  resetDraftWorker: () => void;
}

const initialWorker: Partial<AIWorker> = {
  name: '',
  description: '',
  instructions: '',
  model: 'gpt-4',
  temperature: 0.7,
  tools: [],
};

const useWorkerStore = create<WorkerState>((set) => ({
  draftWorker: initialWorker,
  setDraftWorker: (worker) => set({ draftWorker: worker }),
  updateDraftWorker: (data) =>
    set((state) => ({ draftWorker: { ...state.draftWorker, ...data } })),
  resetDraftWorker: () => set({ draftWorker: initialWorker }),
}));

export default useWorkerStore;
