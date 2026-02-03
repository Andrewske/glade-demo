'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className = '', ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={`fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${className}`}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: 'left' | 'right'
    belowHeader?: boolean
  }
>(({ side = 'left', belowHeader = false, className = '', children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay className={belowHeader ? 'top-14' : ''} />
    <DialogPrimitive.Content
      ref={ref}
      className={`fixed z-50 gap-4 bg-[#212121] p-0 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 ${
        side === 'left'
          ? `left-0 w-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left ${
              belowHeader ? 'top-10 bottom-0' : 'inset-y-0 h-full'
            }`
          : `right-0 w-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right ${
              belowHeader ? 'top-10 bottom-0' : 'inset-y-0 h-full'
            }`
      } ${className}`}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

export { Sheet, SheetTrigger, SheetClose, SheetContent }
