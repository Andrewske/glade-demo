'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TabNavigationProps {
  contactId: string
}

const tabs = [
  { name: 'Overview', href: '' },
  { name: 'Information', href: 'information' },
  { name: 'Conversation', href: 'conversation' },
  { name: 'Documents', href: 'documents' },
  { name: 'Forms', href: 'forms' },
  { name: 'Workflows', href: 'workflows' },
  { name: 'Invoices', href: 'invoices' },
  { name: 'Order History', href: 'order-history' },
  { name: 'AI Follow-up Cadence', href: 'ai-followup-cadence' },
  { name: 'Notes', href: 'notes' },
]

export const TabNavigation = ({ contactId }: TabNavigationProps) => {
  const pathname = usePathname()

  const isActive = (tabHref: string): boolean => {
    const basePath = `/contact/${contactId}`
    if (tabHref === '') {
      return pathname === basePath
    }
    return pathname === `${basePath}/${tabHref}`
  }

  return (
    <div className="border-b border-white/10 bg-[#0d0d0d]">
      <nav className="flex gap-6 overflow-x-auto px-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const active = isActive(tab.href)
          const href = tab.href === '' ? `/contact/${contactId}` : `/contact/${contactId}/${tab.href}`

          return (
            <Link
              key={tab.name}
              href={href}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                active
                  ? 'border-pink-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
