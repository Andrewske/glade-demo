'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Plus } from 'lucide-react'
import { contacts } from '@/lib/mock-data'
import { calculateStatus } from '@/lib/status'
import { StatusBadge } from './status-badge'
import { cn } from '@/lib/utils'

interface ContactSidebarProps {
  mobileMode?: boolean
  onClose?: () => void
}

const getInitials = (name: string): string => {
  const parts = name.split(' ')
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`
    : name.slice(0, 2)
}

export const ContactSidebar = ({
  mobileMode = false,
  onClose,
}: ContactSidebarProps = {}) => {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleClick = (id: string) => {
    setLoadingId(id)
    startTransition(() => {
      // Navigation happens via Link, this just tracks loading state
      if (mobileMode && onClose) {
        onClose() // Close sidebar when navigating on mobile
      }
    })
  }

  return (
    <div className={`flex h-screen w-full md:w-90 flex-col border-r border-white/10 bg-[#212121]`}>
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <h2 className="mb-3 text-2xl font-semibold text-white">Contacts</h2>

          {/* Tabs */}
          <div className="mb-3 flex gap-4">
            <button className="text-sm font-medium text-white border-b-2 border-white pb-1">
              Contacts
            </button>
            <button className="text-sm font-medium text-gray-400 hover:text-white pb-1">
              Companies
            </button>
          </div>

          <button className="flex items-center justify-center gap-2 rounded bg-[var(--color-primary)] px-3 py-2 text-xs font-medium text-white transition-colors hover:brightness-110">
            <Plus className="h-4 w-4" />
            Create Contact
          </button>
        </div>

      {/* Search with integrated Filters - Full width with top/bottom border */}
      <div className="relative h-12 border-b border-white/10 bg-[#212121]">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full bg-transparent pl-11 pr-28 text-sm text-white placeholder-gray-500 focus:outline-none"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-medium text-white">
            1
          </span>
        </button>
      </div>

      {/* Total count */}


      {/* Contact list */}
      <nav aria-label="Contact list" className="flex-1 overflow-y-auto bg-[#292929]">
        <div className="py-2 text-center">
          <span className="text-xs text-gray-500">{contacts.length} total</span>
        </div>
        {contacts.map((contact) => {
          const status = calculateStatus(contact)
          const isActive = pathname.startsWith(`/contact/${contact.id}`)
          const isLoading = loadingId === contact.id && isPending

          const statusLabels = {
            'needs-attention': 'needs attention',
            'waiting-for-you': 'waiting for you',
            'waiting-for-them': 'waiting for them',
          }

          return (
            <Link
              key={contact.id}
              href={`/contact/${contact.id}`}
              onClick={() => handleClick(contact.id)}
              aria-label={`View ${contact.name}, status: ${statusLabels[status]}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 h-20 transition-all bg-[#212121]',
                isActive && 'mx-2 my-1 rounded border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10',
                !isActive && 'mx-2 my-1 rounded border border-white/5 hover:bg-white/5',
                isLoading && 'opacity-70'
              )}
            >
              {/* Avatar */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: contact.avatarColor }}
              >
                {getInitials(contact.name)}
              </div>

              {/* Contact info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-white">
                    {contact.name}
                  </p>
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <StatusBadge status={status} variant="dot" />
                  )}
                </div>
                <p className="truncate text-xs text-gray-400">
                  {contact.email}
                </p>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
