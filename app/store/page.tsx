"use client";
import { useEffect, useState } from "react";

interface Worker {
  id: string;
  role: string;
  name: string;
  traits: string;
}

export default function StorePage() {
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/workers");
      if (res.ok) {
        setWorkers(await res.json());
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {workers.map((w) => (
        <div key={w.id} className="border rounded bg-white shadow p-4">
          <h2 className="text-lg font-semibold">{w.name}</h2>
          <p className="text-sm text-gray-500">{w.role}</p>
          <p className="mt-2 text-sm">{w.traits}</p>
        </div>
      ))}
      {workers.length === 0 && <p>No workers found.</p>}
    </div>
  );
}
