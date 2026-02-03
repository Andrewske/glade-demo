'use client'

import { useEffect, useState } from 'react'
import type { ContactWithContext } from '@/lib/types'

interface SuggestedActionProps {
  contact: ContactWithContext
}

export function SuggestedAction({ contact }: SuggestedActionProps) {
  const [escalationMessage, setEscalationMessage] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const fetchEscalation = async () => {
      try {
        const response = await fetch(`/api/summary/${contact.id}`)
        const data = await response.json()
        setEscalationMessage(data.escalation || '')
      } catch (error) {
        console.error('Failed to fetch escalation message:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEscalation()
  }, [contact.id])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(escalationMessage)
      setToast('Message copied to clipboard')
      setTimeout(() => setToast(null), 3000)
    } catch (error) {
      console.error('Failed to copy:', error)
      setToast('Failed to copy message')
      setTimeout(() => setToast(null), 3000)
    }
  }

  const handleSMS = () => {
    setToast('SMS feature coming soon')
    setTimeout(() => setToast(null), 3000)
  }

  if (loading) {
    return (
      <div className="rounded border border-red-500/20 bg-red-950/20 p-6">
        <div className="mb-4 flex items-center gap-2">
          <svg
            className="h-5 w-5 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-white">Suggested Action</h3>
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-white/5" />
      </div>
    )
  }

  if (!escalationMessage) {
    return null
  }

  return (
    <>
      <div className="rounded border border-red-500/20 bg-red-950/20 p-6">
        <div className="mb-4 flex items-center gap-2">
          <svg
            className="h-5 w-5 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-white">Suggested Action</h3>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-gray-300">
          Multiple follow-ups haven't gotten a response. Try a different approach:
        </p>

        <div className="mb-4 rounded border border-white/10 bg-black/30 p-4">
          <p className="text-sm italic leading-relaxed text-gray-200">
            "{escalationMessage}"
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy Message
          </button>

          <button
            onClick={handleSMS}
            className="flex items-center gap-2 rounded bg-pink-500/20 px-4 py-2 text-sm font-medium text-pink-300 transition-colors hover:bg-pink-500/30"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Send via SMS
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded border border-white/10 bg-[#292929] px-4 py-3 shadow-lg">
          <p className="text-sm text-white">{toast}</p>
        </div>
      )}
    </>
  )
}
