"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Assistant from "@/components/assistant";
import useWorkerFormStore from "@/stores/useWorkerFormStore";
import { useRouter } from "next/navigation";

export default function NewWorkerPage() {
  const router = useRouter();
  const {
    role,
    name,
    traits,
    step,
    setRole,
    setName,
    setTraits,
    nextStep,
    prevStep,
    reset,
  } = useWorkerFormStore();

  const handleSubmit = async () => {
    await fetch("/api/workers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, name, traits }),
    });
    reset();
    router.push("/store");
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 p-6 bg-white overflow-y-auto space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Customer support"
              />
            </div>
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="traits" className="text-sm font-medium">
                Persona traits
              </label>
              <Textarea
                id="traits"
                value={traits}
                onChange={(e) => setTraits(e.target.value)}
                placeholder="Friendly, helpful..."
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Summary</h2>
            <p>
              <strong>Role:</strong> {role}
            </p>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Traits:</strong> {traits}
            </p>
          </div>
        )}
        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button variant="secondary" onClick={prevStep}>
              Back
            </Button>
          )}
          {step < 3 && <div className="grow" />}
          {step < 3 && <Button onClick={nextStep}>Next</Button>}
          {step === 3 && <Button onClick={handleSubmit}>Create</Button>}
        </div>
      </div>
      <div className="hidden md:block w-1/2">
        <Assistant />
      </div>
    </div>
  );
}
