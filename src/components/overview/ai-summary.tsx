'use client'

import { useEffect, useState } from 'react'
import type { ContactWithContext } from '@/lib/types'

interface AISummaryProps {
  contact: ContactWithContext
}

export function AISummary({ contact }: AISummaryProps) {
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const fetchSummary = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/summary/${contact.id}`)
      const data = await response.json()
      setSummary(data.summary || 'No summary available')
    } catch (error) {
      console.error('Failed to fetch summary:', error)
      setSummary('Failed to load summary')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [contact.id])

  return (
    <div className="rounded-lg border border-white/10 bg-[#1a1a1a] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">AI Summary</h3>
        <button
          onClick={fetchSummary}
          disabled={loading}
          className="rounded p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
          aria-label="Refresh summary"
        >
          <svg
            className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-white/5" />
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-gray-300">{summary}</p>
      )}
    </div>
  )
}
