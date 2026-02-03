'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { IconRail } from './icon-rail'
import { ContactSidebar } from './contact-sidebar'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

interface MobileLayoutWrapperProps {
  children: React.ReactNode
}

export const MobileLayoutWrapper = ({ children }: MobileLayoutWrapperProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#0d0d0d]">
      {/* Desktop: Always visible */}
      <div className="hidden md:flex">
        <IconRail />
        <ContactSidebar />
      </div>

      {/* Mobile menu button (only visible on mobile) */}
      <div className="fixed left-4 top-4 z-40 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a1a] text-gray-400 hover:bg-white/5 hover:text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex h-full">
              <IconRail />
              <ContactSidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {children}
    </div>
  )
}
