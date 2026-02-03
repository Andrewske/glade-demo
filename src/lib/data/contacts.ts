import { contacts, MOCK_SUMMARIES } from '@/lib/mock-data'
import { calculateStatus } from '@/lib/status'
import type { Contact, ContactWithContext, MockSummary, ContactStatus } from '@/lib/types'

export type ContactWithStatus = ContactWithContext & {
  status: ContactStatus
}

export async function getContacts(): Promise<Contact[]> {
  // Simulates async data fetch
  return contacts
}

export async function getContactById(id: string): Promise<ContactWithStatus | null> {
  const contact = contacts.find(c => c.id === id)
  if (!contact) return null

  return {
    ...contact,
    status: calculateStatus(contact),
  }
}

export async function getContactSummary(id: string): Promise<MockSummary | null> {
  return MOCK_SUMMARIES[id] ?? null
}
