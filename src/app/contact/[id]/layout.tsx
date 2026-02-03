import { notFound } from 'next/navigation'
import { ContactHeader } from '@/components/contact-header'
import { TabNavigation } from '@/components/tab-navigation'
import { contacts } from '@/lib/mock-data'
import { MobileLayoutWrapper } from '@/components/mobile-layout-wrapper'

interface ContactLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function ContactLayout({
  children,
  params,
}: ContactLayoutProps) {
  const { id } = await params

  // Find contact by ID
  const contact = contacts.find((c) => c.id === id)

  if (!contact) {
    notFound()
  }

  return (
    <MobileLayoutWrapper>
      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <ContactHeader contact={contact} />
        <TabNavigation contactId={id} />

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </MobileLayoutWrapper>
  )
}
