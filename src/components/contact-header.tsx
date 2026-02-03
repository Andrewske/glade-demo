import { Settings } from 'lucide-react'
import { type ContactWithContext } from '@/lib/types'
import { calculateStatus } from '@/lib/status'
import { StatusBadge } from './status-badge'

interface ContactHeaderProps {
  contact: ContactWithContext
}

const getInitials = (name: string): string => {
  const parts = name.split(' ')
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`
    : name.slice(0, 2)
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export const ContactHeader = ({ contact }: ContactHeaderProps) => {
  const status = calculateStatus(contact)

  return (
    <div className="border-b border-white/10 bg-[#212121] px-4 py-4 md:px-6">
      <div className="mb-4 items-center gap-1 text-xs text-gray-400 flex">
        <span>Contacts</span>
        <span>/</span>
        <span>Unverified</span>
        <span>/</span>
        <span className="text-white">{contact.name}</span>
      </div>

      {/* Contact info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">


          <div>
            {/* Name and status */}
            <div className="mb-1 flex gap-2 md:flex-row md:items-center md:gap-3">
              <h1 className="text-2xl font-semibold text-white md:text-2xl">
                {contact.name}
              </h1>
              <StatusBadge status={status} variant="badge" />
            </div>

            {/* Email and created date */}
            <div className="flex flex-col gap-1 text-xs text-gray-400 md:flex-row md:items-center md:gap-3 md:text-sm">
              <span>{contact.email}</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Created at {formatDate(contact.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Settings icon */}
        <button className="flex h-10 w-10 items-center justify-center rounded text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
