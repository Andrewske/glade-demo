'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { IconRail } from '@/components/icon-rail'
import { ContactSidebar } from '@/components/contact-sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function ContactsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#0d0d0d]">
      {/* Desktop: Always visible */}
      <div className="hidden md:flex">
        <IconRail />
        <ContactSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header with hamburger */}
        <div className="flex items-center gap-4 border-b border-white/10 p-4 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 hover:text-white">
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
          <h1 className="text-lg font-semibold text-white">Contacts</h1>
        </div>

        {/* Placeholder content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-400">Select a contact to view details</p>
          </div>
        </div>
      </div>
    </div>
  )
}
