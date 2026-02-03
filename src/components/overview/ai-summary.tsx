'use client'

import { useEffect, useState, useTransition } from 'react'
import { readStreamableValue } from '@ai-sdk/rsc'
import { toast } from 'react-toastify'
import { generateContactSummary, type SummaryResult } from '@/actions/generate-summary'
import { RefreshCw } from 'lucide-react'
import type { ContactWithContext } from '@/lib/types'

interface AISummaryProps {
  contact: ContactWithContext
}

export function AISummary({ contact }: AISummaryProps) {
  const [data, setData] = useState<Partial<SummaryResult>>({})
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Inline async logic to avoid stale closure issues
  useEffect(() => {
    setData({})
    setError(null)

    startTransition(async () => {
      try {
        const result = await generateContactSummary(contact)

        if (result.type === 'static') {
          setData(result.data)
        } else {
          for await (const partialObject of readStreamableValue(result.stream)) {
            if (partialObject) {
              setData(partialObject)
            }
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to generate summary'
        setError(message)
        toast.error(message)
      }
    })
  }, [contact.id])

  const handleRefresh = () => {
    setData({})
    setError(null)

    startTransition(async () => {
      try {
        const result = await generateContactSummary(contact)

        if (result.type === 'static') {
          setData(result.data)
        } else {
          for await (const partialObject of readStreamableValue(result.stream)) {
            if (partialObject) {
              setData(partialObject)
            }
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to generate summary'
        setError(message)
        toast.error(message)
      }
    })
  }

  return (
    <div className="rounded-lg border border-white/10 bg-[#1a1a1a] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">AI Summary</h3>
        <button
          onClick={handleRefresh}
          disabled={isPending}
          className="rounded p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
          aria-label="Refresh summary"
        >
          <RefreshCw className={`h-5 w-5 ${isPending ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {isPending && !data.summary ? (
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-white/5" />
        </div>
      ) : error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : (
        <p className="text-sm leading-relaxed text-gray-300">{data.summary}</p>
      )}
    </div>
  )
}
