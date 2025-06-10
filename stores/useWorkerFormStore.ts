import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkerFormState {
  role: string;
  name: string;
  traits: string;
  step: number;
  setRole: (role: string) => void;
  setName: (name: string) => void;
  setTraits: (traits: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const useWorkerFormStore = create<WorkerFormState>()(
  persist(
    (set) => ({
      role: "",
      name: "",
      traits: "",
      step: 1,
      setRole: (role) => set({ role }),
      setName: (name) => set({ name }),
      setTraits: (traits) => set({ traits }),
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      reset: () => set({ role: "", name: "", traits: "", step: 1 }),
    }),
    { name: "worker-form" }
  )
);

export default useWorkerFormStore;
