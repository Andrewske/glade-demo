'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Workflow, FileText, Settings } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export const IconRail = () => {
  const pathname = usePathname()

  const isActive = (href: string): boolean => {
    if (href === '/contacts') {
      return pathname === '/contacts' || pathname.startsWith('/contact/')
    }
    return pathname === href
  }

  return (
    <div className="flex h-screen w-[60px] flex-col items-center bg-[#0a0a0a] py-4">
      {/* Glade logo */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-600">
        <span className="text-lg font-bold text-white">G</span>
      </div>

      {/* Navigation icons */}
      <nav className="flex flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                active
                  ? 'bg-pink-600/20 text-pink-500'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              title={item.name}
            >
              <Icon className="h-5 w-5" />
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
