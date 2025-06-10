'use client'
import { useState } from 'react'
import { useWorkerStore } from '@/stores/useWorkerStore'
import Assistant from '@/components/assistant'

const steps = ['Role', 'Persona', 'Configure']

export default function NewWorker() {
  const [step, setStep] = useState(0)
  const { draft, setDraft } = useWorkerStore()

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">New AI Worker · Draft</h1>
        <div className="mb-4">Step {step + 1}: {steps[step]}</div>
        {step === 0 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm">Job Title</label>
            <input className="border p-2" value={draft.role || ''} onChange={e=>setDraft({role:e.target.value})} />
            <button className="mt-2 bg-blue-600 text-white px-3 py-1" onClick={()=>setStep(1)}>Next</button>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm">Worker Name</label>
            <input className="border p-2" value={draft.name || ''} onChange={e=>setDraft({name:e.target.value})} />
            <button className="mt-2 bg-blue-600 text-white px-3 py-1" onClick={()=>setStep(2)}>Next</button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm">System Prompt</label>
            <textarea className="border p-2" value={draft.systemPrompt || ''} onChange={e=>setDraft({systemPrompt:e.target.value})}></textarea>
            <button className="mt-2 bg-blue-600 text-white px-3 py-1" onClick={()=>setStep(0)}>Back to Start</button>
          </div>
        )}
      </div>
      <div className="w-1/2">
        <Assistant />
      </div>
    </div>
  )
}
