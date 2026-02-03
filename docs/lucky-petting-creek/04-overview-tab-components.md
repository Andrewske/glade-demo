# Overview Tab Components

## Files to Modify/Create
- `src/app/contact/[id]/page.tsx` (modify - add Overview content)
- `src/components/overview/ai-summary.tsx` (new)
- `src/components/overview/pending-items.tsx` (new)
- `src/components/overview/followup-history.tsx` (new)
- `src/components/overview/suggested-action.tsx` (new)

## Implementation Details

### 1. Overview Tab Layout (`src/app/contact/[id]/page.tsx`)

Grid layout for Overview tab content:
```typescript
export default function OverviewPage({ params }: { params: { id: string } }) {
  const contact = getContactById(params.id)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <AISummary contact={contact} />
      <PendingItems items={contact.pendingItems} />
      <FollowupHistory conversations={contact.conversations} />
      {contact.status === 'needs-attention' && (
        <SuggestedAction contact={contact} />
      )}
    </div>
  )
}
```

### 2. AI Summary Card (`src/components/overview/ai-summary.tsx`)

**Client Component** (needs streaming state)

Structure:
```
┌─────────────────────────────────────┐
│ AI Summary              [Refresh ↻] │
├─────────────────────────────────────┤
│ {streaming or static summary text}  │
│                                     │
│ {skeleton while loading}            │
└─────────────────────────────────────┘
```

Features:
- Uses `useEffect` to generate summary on mount
- Shows skeleton during loading
- Streaming text animation (if real API)
- Refresh button to regenerate
- Handles fallback mode (no streaming animation)

Props:
```typescript
interface AISummaryProps {
  contact: ContactWithContext
}
```

### 3. Pending Items (`src/components/overview/pending-items.tsx`)

**Server Component**

3-column grid showing status:

```
┌─────────────┬─────────────┬─────────────┐
│ Documents   │ Forms       │ Invoices    │
│ 4/6 ⚠️      │ Complete ✓  │ $500 unpaid │
│ [View →]    │ [View →]    │ [View →]    │
└─────────────┴─────────────┴─────────────┘
```

Each column:
- Icon
- Status indicator (progress, checkmark, warning)
- Link to respective tab

Props:
```typescript
interface PendingItemsProps {
  items: PendingItems
}
```

### 4. Follow-up History (`src/components/overview/followup-history.tsx`)

**Server Component**

Timeline of last 5 interactions:

```
┌─────────────────────────────────────┐
│ Follow-up History                   │
├─────────────────────────────────────┤
│ 📤 AI Follow-up sent     Jan 21     │
│ 📤 AI Follow-up sent     Jan 14     │
│ 📥 Client responded      Jan 10     │
│ 📤 AI Follow-up sent     Jan 7      │
│ 📄 Document uploaded     Jan 5      │
└─────────────────────────────────────┘
```

Icons by type:
- `ai-followup`: 📤 or send icon
- `client-response`: 📥 or inbox icon
- `attorney-message`: 💬 or message icon
- `system`: 🔔 or bell icon

Props:
```typescript
interface FollowupHistoryProps {
  conversations: Conversation[]
}
```

### 5. Suggested Action (`src/components/overview/suggested-action.tsx`)

**Client Component** (needs copy functionality)

Only renders when status is "needs-attention":

```
┌─────────────────────────────────────┐
│ ⚠️ Suggested Action                 │
├─────────────────────────────────────┤
│ Multiple follow-ups haven't gotten  │
│ a response. Try a different         │
│ approach:                           │
│                                     │
│ "Hi Maria, I know gathering         │
│ documents can be tough..."          │
│                                     │
│ [Copy Message] [Send via SMS]       │
└─────────────────────────────────────┘
```

Features:
- Shows AI-generated escalation message
- Copy button (copies to clipboard)
- Send via SMS button (non-functional, shows toast)
- Warning/attention styling (red accent)

Props:
```typescript
interface SuggestedActionProps {
  contact: ContactWithContext
}
```

## Acceptance Criteria
- [ ] Overview tab shows all 4 cards in grid layout
- [ ] AI Summary loads with skeleton, then shows text
- [ ] Refresh button regenerates summary
- [ ] Pending Items shows correct counts for each contact
- [ ] Follow-up History shows last 5 messages with correct icons
- [ ] Suggested Action only appears for red-status contacts
- [ ] Copy button copies escalation message to clipboard
- [ ] Cards have consistent styling (dark background, subtle border)

## Dependencies
- Task 01 (project scaffolding)
- Task 02 (types and mock data)
- Task 03 (layout shell)
