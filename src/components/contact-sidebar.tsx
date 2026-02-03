'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Plus, ChevronDown } from 'lucide-react'
import { contacts } from '@/lib/mock-data'
import { calculateStatus } from '@/lib/status'
import { StatusBadge } from './status-badge'
import { cn } from '@/lib/utils'

const getInitials = (name: string): string => {
  const parts = name.split(' ')
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`
    : name.slice(0, 2)
}

export const ContactSidebar = () => {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleClick = (id: string) => {
    setLoadingId(id)
    startTransition(() => {
      // Navigation happens via Link, this just tracks loading state
    })
  }

  return (
    <div className="flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0d0d0d]">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">Contacts</h2>
          <button className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-400 hover:bg-white/5 min-h-[44px]">
            Companies
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-700 min-h-[44px]">
          <Plus className="h-4 w-4" />
          Create Contact
        </button>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/50"
          />
        </div>

        {/* Filters chip */}
        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 hover:bg-white/10 min-h-[44px]">
          Filters
        </button>
      </div>

      {/* Contact list */}
      <nav aria-label="Contact list" className="flex-1 overflow-y-auto">
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
                'flex items-center gap-3 border-b border-white/5 px-4 py-3 transition-all',
                isActive && 'bg-white/10',
                !isActive && 'hover:bg-white/5',
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
