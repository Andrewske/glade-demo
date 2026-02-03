'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { MainNavigationSidebar } from '@/components/main-navigation-sidebar'

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Fixed header */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-10 items-center border-b border-white/10  px-2 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-8 w-8 items-center justify-center rounded ${
            isOpen ? 'bg-[#5A92FF] text-[#212121]' : 'text-white'
          }`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="flex flex-1 items-center justify-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
            KA
          </div>
          <span className="text-xs font-medium text-white">Kevin Andrews</span>
        </div>
      </div>

      {/* Navigation sheet - positioned below header */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" belowHeader>
          <MainNavigationSidebar
            currentPath={pathname}
            onClose={() => setIsOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
