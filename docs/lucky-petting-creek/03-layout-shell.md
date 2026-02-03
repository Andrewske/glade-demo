# Layout Shell

## Files to Modify/Create
- `src/app/page.tsx` (modify - redirect to /contacts)
- `src/app/contacts/page.tsx` (new)
- `src/app/contact/[id]/layout.tsx` (new)
- `src/app/contact/[id]/page.tsx` (new)
- `src/app/contact/[id]/[tab]/page.tsx` (new)
- `src/components/icon-rail.tsx` (new)
- `src/components/contact-sidebar.tsx` (new)
- `src/components/contact-header.tsx` (new)
- `src/components/tab-navigation.tsx` (new)
- `src/components/status-badge.tsx` (new)

## Implementation Details

### 1. Root Page (`src/app/page.tsx`)
Simple redirect to `/contacts`:
```typescript
import { redirect } from 'next/navigation'
export default function Home() {
  redirect('/contacts')
}
```

### 2. Icon Rail (`src/components/icon-rail.tsx`)
Left navigation matching Glade screenshot:
- ~60px fixed width
- Icons: Home, Contacts (active), Workflows, Documents, Settings
- Dark background with hover states
- Glade logo at top

### 3. Contact Sidebar (`src/components/contact-sidebar.tsx`)
- ~220px width
- "Contacts" header with "Companies" toggle (non-functional)
- "+ Create Contact" button (pink accent, non-functional)
- Search input
- "Filters" chip
- Scrollable contact list
- Each contact shows: Avatar (colored initials), Name, Email, Status dot

### 4. Status Badge (`src/components/status-badge.tsx`)
Two variants:
```typescript
interface StatusBadgeProps {
  status: ContactStatus
  variant: 'dot' | 'badge'
}
```
- `dot`: Small colored circle (for sidebar)
- `badge`: Full badge with label (for header)

Colors:
- `waiting-for-them`: green (#22c55e)
- `waiting-for-you`: amber (#f59e0b)
- `needs-attention`: red (#ef4444)

### 5. Contacts Page (`src/app/contacts/page.tsx`)
Layout with icon rail + sidebar + main content placeholder:
```
┌─────────────────────────────────────────────────────────┐
│ IconRail │ ContactSidebar │ "Select a contact"          │
│  (60px)  │    (220px)     │     (remaining)             │
└─────────────────────────────────────────────────────────┘
```

### 6. Contact Layout (`src/app/contact/[id]/layout.tsx`)
Wraps all contact detail pages:
- Fetches contact data by ID
- Renders ContactHeader + TabNavigation
- Children slot for tab content

### 7. Contact Header (`src/components/contact-header.tsx`)
- Breadcrumb: "Contacts / Unverified / {Name}"
- Avatar (large) + Name + Status badge
- Email + "Created at {date}"
- Settings icon (non-functional)

### 8. Tab Navigation (`src/components/tab-navigation.tsx`)
Horizontal tabs matching screenshot:
- **Overview** (new, first position)
- Information, Conversation, Documents, Forms, Workflows, Invoices, Order History, AI Follow-up Cadence, Notes

Active state: underline

### 9. Contact Detail Pages
- `page.tsx`: Overview tab (default) - placeholder for now
- `[tab]/page.tsx`: Other tabs - simple "Coming soon" placeholder

### 10. Mobile Responsive
- Sidebar becomes sheet/drawer on mobile
- Hamburger menu to toggle
- Use shadcn Sheet component

## Acceptance Criteria
- [ ] `/` redirects to `/contacts`
- [ ] `/contacts` shows sidebar with 5 contacts and status dots
- [ ] Clicking contact navigates to `/contact/{id}`
- [ ] Contact detail shows header with status badge
- [ ] Tab navigation works (Overview + stub tabs)
- [ ] Mobile: sidebar is a drawer
- [ ] Design matches Glade screenshot (colors, spacing, typography)

## Dependencies
- Task 01 (project scaffolding)
- Task 02 (types and mock data)
