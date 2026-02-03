export type ContactStatus = 'waiting-for-them' | 'waiting-for-you' | 'needs-attention'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  chapter: '7' | '13'
  avatarColor: string
  createdAt: Date
}

export interface Conversation {
  id: string
  contactId: string
  type: 'ai-followup' | 'client-response' | 'attorney-message' | 'system'
  content: string
  timestamp: Date
}

export interface DocumentItem {
  name: string
  status: 'uploaded' | 'missing' | 'pending'
}

export interface PendingItems {
  documents: { required: number; uploaded: number; items: DocumentItem[] }
  forms: { complete: boolean; name: string }
  invoices: { total: number; paid: number; overdue: boolean }
}

export interface ContactWithContext extends Contact {
  conversations: Conversation[]
  pendingItems: PendingItems
  notes: string[]
  lastClientResponse: Date | null
  followUpCount: number
}

export interface MockSummary {
  summary: string
  escalation?: string
}
