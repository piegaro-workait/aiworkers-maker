import { create } from 'zustand'
import { AIWorker } from '@/lib/types'

interface WorkerState {
  draft: Partial<AIWorker>
  setDraft: (data: Partial<AIWorker>) => void
  reset: () => void
}

export const useWorkerStore = create<WorkerState>((set) => ({
  draft: {},
  setDraft: (data) => set((state) => ({ draft: { ...state.draft, ...data } })),
  reset: () => set({ draft: {} }),
}))
