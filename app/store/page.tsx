'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function StorePage() {
  const { data } = useSWR('/api/workers', fetcher)
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data || []).map((w: any) => (
          <div key={w.id} className="border p-4 rounded shadow-sm">
            <div className="font-bold">{w.name}</div>
            <div className="text-sm text-gray-600">{w.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
