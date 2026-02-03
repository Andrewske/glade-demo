import Link from 'next/link'
import type { PendingItems as PendingItemsType } from '@/lib/types'

interface PendingItemsProps {
  items: PendingItemsType
}

export function PendingItems({ items }: PendingItemsProps) {
  const { documents, forms, invoices } = items

  const allComplete =
    documents.uploaded === documents.required &&
    forms.complete &&
    invoices.paid === invoices.total &&
    !invoices.overdue

  return (
    <div className="rounded-lg border border-white/10 bg-[#1a1a1a] p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Pending Items</h3>

      {allComplete ? (
        <p className="text-sm text-green-400">✓ All items are complete!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Documents Column */}
        <div className="rounded-lg border border-white/5 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-medium text-white">Documents</span>
          </div>

          <div className="mb-3">
            {documents.uploaded === documents.required ? (
              <div className="flex items-center gap-1.5 text-sm text-green-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Complete
              </div>
            ) : (
              <div className="text-sm">
                <span className="text-amber-400">
                  {documents.uploaded}/{documents.required}
                </span>
                <span className="text-gray-400"> uploaded</span>
              </div>
            )}
          </div>

          <Link
            href="#documents"
            className="text-sm text-pink-400 hover:text-pink-300"
          >
            View →
          </Link>
        </div>

        {/* Forms Column */}
        <div className="rounded-lg border border-white/5 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="font-medium text-white">Forms</span>
          </div>

          <div className="mb-3">
            {forms.complete ? (
              <div className="flex items-center gap-1.5 text-sm text-green-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Complete
              </div>
            ) : (
              <div className="text-sm text-amber-400">
                {forms.name}
              </div>
            )}
          </div>

          <Link
            href="#forms"
            className="text-sm text-pink-400 hover:text-pink-300"
          >
            View →
          </Link>
        </div>

        {/* Invoices Column */}
        <div className="rounded-lg border border-white/5 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-white">Invoices</span>
          </div>

          <div className="mb-3">
            {invoices.paid === invoices.total && !invoices.overdue ? (
              <div className="flex items-center gap-1.5 text-sm text-green-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Paid
              </div>
            ) : (
              <div className="text-sm">
                <span className={invoices.overdue ? 'text-red-400' : 'text-gray-400'}>
                  ${invoices.total - invoices.paid}
                </span>
                <span className="text-gray-400">
                  {invoices.overdue ? ' overdue' : ' pending'}
                </span>
              </div>
            )}
          </div>

          <Link
            href="#invoices"
            className="text-sm text-pink-400 hover:text-pink-300"
          >
            View →
          </Link>
        </div>
      </div>
      )}
    </div>
  )
}
