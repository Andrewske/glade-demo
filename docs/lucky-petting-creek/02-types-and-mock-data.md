# Types and Mock Data

## Files to Modify/Create
- `src/lib/types.ts` (new)
- `src/lib/status.ts` (new)
- `src/lib/mock-data.ts` (new)
- `src/lib/utils.ts` (new)
- `src/lib/data/contacts.ts` (new - data abstraction layer)

## Implementation Details

### 1. TypeScript Interfaces (`src/lib/types.ts`)

```typescript
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
```

### 2. Status Calculation (`src/lib/status.ts`)

Pure function with priority logic:
1. **Needs attention** (red): `(followUpCount >= 3 AND daysSinceResponse >= 10) OR hasOverdueInvoice`
2. **Waiting for you** (amber): Client uploaded docs or responded, attorney hasn't acted
3. **Waiting for them** (green): Default - follow-up sent, awaiting client

```typescript
export function calculateStatus(contact: ContactWithContext): ContactStatus {
  const daysSinceResponse = contact.lastClientResponse
    ? daysBetween(contact.lastClientResponse, new Date())
    : Infinity

  // Priority 1: Needs attention (red)
  if ((contact.followUpCount >= 3 && daysSinceResponse >= 10) ||
      contact.pendingItems.invoices.overdue) {
    return 'needs-attention'
  }

  // Priority 2: Waiting for you (amber)
  // Check if client's last action is more recent than attorney's last action
  const hasUnreviewedClientAction = checkUnreviewedClientAction(contact)
  if (hasUnreviewedClientAction) {
    return 'waiting-for-you'
  }

  // Priority 3: Waiting for them (green)
  return 'waiting-for-them'
}
```

### 3. Mock Data (`src/lib/mock-data.ts`)

Create 5 contacts with full conversation histories:

| Name | Status | Scenario |
|------|--------|----------|
| Maria Garcia | Red | 3 follow-ups, 12 days no response |
| John Smith | Green | Recent follow-up, on track |
| David Chen | Amber | Uploaded docs 2 days ago, needs review |
| Sarah Johnson | Green | All good, awaiting final docs |
| Robert Wilson | Red | Overdue invoice + missing docs |

Each contact needs:
- 5-8 conversation messages
- Pending items (docs, forms, invoices)
- 1-2 notes
- Realistic dates

### 4. Mock AI Summaries (in `mock-data.ts`)

Pre-written summaries for fallback mode:
```typescript
export const MOCK_SUMMARIES: Record<string, MockSummary> = {
  'maria-garcia': {
    summary: 'Maria is a Chapter 7 bankruptcy client who has been unresponsive for 12 days despite 3 follow-up attempts. She has uploaded 4/6 required documents but is missing pay stubs and bank statements.',
    escalation: 'Hi Maria, I know gathering documents can be tough. Would a quick 5-minute call help? I can walk you through exactly what we need from your employer for the pay stubs.'
  },
  // ... other contacts
}
```

### 5. Data Layer (`src/lib/data/contacts.ts`)

Async abstraction over mock data for proper server/client component patterns:

```typescript
import { contacts, MOCK_SUMMARIES } from '@/lib/mock-data'
import { calculateStatus } from '@/lib/status'
import type { Contact, ContactWithContext } from '@/lib/types'

export async function getContacts(): Promise<Contact[]> {
  // Simulates async data fetch
  return contacts
}

export async function getContactById(id: string): Promise<ContactWithContext | null> {
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
```

### 6. Utility Functions (`src/lib/utils.ts`)

```typescript
export function daysBetween(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

## Acceptance Criteria
- [ ] All types exported and importable
- [ ] `calculateStatus()` returns correct status for each mock contact
- [ ] 5 mock contacts with complete data
- [ ] Mock summaries exist for all 5 contacts
- [ ] Utility functions work correctly
- [ ] Data layer functions return proper types
- [ ] `getContactById()` returns null for invalid IDs

## Dependencies
- Task 01 (project scaffolding)
