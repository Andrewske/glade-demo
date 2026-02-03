# Polish and Accessibility

## Files to Modify/Create
- `src/app/error.tsx` (new)
- `src/app/not-found.tsx` (new - global 404)
- `src/app/contact/[id]/not-found.tsx` (new - invalid contact ID)
- `src/app/loading.tsx` (new)
- `src/app/contact/[id]/loading.tsx` (new)
- `src/app/layout.tsx` (modify - add ToastContainer)
- `src/components/contact-sidebar.tsx` (modify - add loading state)
- Various components (modify - add animations)
- `src/lib/utils.ts` (modify - add animation utilities)

## Implementation Details

### 1. Loading States

**Global Loading (`src/app/loading.tsx`)**
```typescript
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent" />
    </div>
  )
}
```

**Contact Loading (`src/app/contact/[id]/loading.tsx`)**

Uses shadcn Skeleton for polished loading state:
```typescript
import { Skeleton } from '@/components/ui/skeleton'

export default function ContactLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
      </div>
    </div>
  )
}
```

### 5b. Sidebar Loading Feedback

Add immediate visual feedback when clicking a contact:

**Update ContactSidebar (`src/components/contact-sidebar.tsx`)**
```typescript
'use client'

import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import Link from 'next/link'

export function ContactSidebar({ contacts }: ContactSidebarProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleClick = (id: string) => {
    setLoadingId(id)
    startTransition(() => {
      // Navigation happens via Link, this just tracks loading state
    })
  }

  return (
    <nav aria-label="Contact list">
      {contacts.map(contact => {
        const isActive = pathname === `/contact/${contact.id}`
        const isLoading = loadingId === contact.id && isPending

        return (
          <Link
            key={contact.id}
            href={`/contact/${contact.id}`}
            onClick={() => handleClick(contact.id)}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg transition-all',
              isActive && 'bg-card-hover',
              isLoading && 'opacity-70'
            )}
          >
            <Avatar />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{contact.name}</p>
              <p className="text-sm text-gray-400 truncate">{contact.email}</p>
            </div>
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            ) : (
              <StatusBadge status={contact.status} variant="dot" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
```

### 2. Not Found Pages

**Global Not Found (`src/app/not-found.tsx`)**
```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-semibold">Page not found</h2>
      <p className="text-gray-400">The page you're looking for doesn't exist.</p>
      <Button asChild>
        <Link href="/contacts">Back to contacts</Link>
      </Button>
    </div>
  )
}
```

**Contact Not Found (`src/app/contact/[id]/not-found.tsx`)**
```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ContactNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
      <h2 className="text-xl font-semibold">Contact not found</h2>
      <p className="text-gray-400">This contact doesn't exist or has been removed.</p>
      <Button asChild>
        <Link href="/contacts">Back to contacts</Link>
      </Button>
    </div>
  )
}
```

In `src/app/contact/[id]/layout.tsx`, call `notFound()` when contact is null:
```typescript
import { notFound } from 'next/navigation'
import { getContactById } from '@/lib/data/contacts'

export default async function ContactLayout({ params, children }) {
  const contact = await getContactById(params.id)
  if (!contact) notFound()
  // ... rest of layout
}
```

### 3. Toast Provider Setup

**Update Root Layout (`src/app/layout.tsx`)**
```typescript
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={5000}
        />
      </body>
    </html>
  )
}
```

### 4. Error Boundaries

**Global Error (`src/app/error.tsx`)**
```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-gray-400">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

### 3. Animations

**Card Fade-in Animation**
Add to all overview cards:
```typescript
<Card className="animate-in fade-in duration-500">
```

Using Tailwind CSS animations:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
```

**Staggered Card Animation**
```typescript
const cards = ['ai-summary', 'pending-items', 'followup-history', 'suggested-action']

{cards.map((card, index) => (
  <div
    key={card}
    className="animate-fade-in"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* card content */}
  </div>
))}
```

**Tab Transition**
Smooth content transitions when switching tabs:
```typescript
<div className="transition-opacity duration-200">
  {children}
</div>
```

### 4. Mobile Responsive

**Sidebar Drawer**
Use shadcn Sheet component:
```typescript
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

// On mobile, sidebar becomes a sheet
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="lg:hidden">
      <Menu />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-[280px] p-0">
    <ContactSidebar />
  </SheetContent>
</Sheet>
```

**Responsive Grid**
```typescript
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* cards stack on mobile, 2-column on desktop */}
</div>
```

**Hide Icon Rail on Mobile**
```typescript
<IconRail className="hidden lg:flex" />
```

### 5. Keyboard Navigation

**Focus Management**
- Tab through sidebar contacts
- Enter to select contact
- Tab through overview cards
- Escape to close mobile drawer

**Focus Visible Styling**
```css
:focus-visible {
  outline: 2px solid #ec4899;
  outline-offset: 2px;
}
```

### 6. Accessibility

**ARIA Labels**
```typescript
<nav aria-label="Contact list">
  {contacts.map(contact => (
    <button
      aria-label={`View ${contact.name}, status: ${contact.status}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* contact item */}
    </button>
  ))}
</nav>
```

**Status Badge Accessibility**
```typescript
<span
  role="status"
  aria-label={`Status: ${statusLabels[status]}`}
  className={statusColors[status]}
/>
```

**Skip Link**
```typescript
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to main content
</a>
```

### 7. Touch Targets

Ensure all interactive elements are at least 44x44px on mobile:
```typescript
<Button className="min-h-[44px] min-w-[44px]">
```

### 8. Empty States

Handle cases where data is empty:

**Empty Conversations (Follow-up History)**
```typescript
{conversations.length === 0 ? (
  <p className="text-gray-400 text-sm">No conversation history yet.</p>
) : (
  // ... render conversations
)}
```

**Empty Pending Items**
```typescript
{!hasAnyPendingItems ? (
  <p className="text-gray-400 text-sm">All items are complete!</p>
) : (
  // ... render items
)}
```

## Acceptance Criteria
- [ ] Loading states show for all async operations
- [ ] Sidebar shows loading spinner on clicked contact
- [ ] Error boundary catches and displays errors gracefully
- [ ] 404 page shows for invalid contact IDs
- [ ] Toast notifications appear for AI errors
- [ ] Empty states display for missing data
- [ ] Cards animate in with staggered fade
- [ ] Tab transitions are smooth
- [ ] Mobile: sidebar is a drawer, icon rail hidden
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces status changes
- [ ] All interactive elements have visible focus states
- [ ] Touch targets are 44px minimum

## Dependencies
- Task 01-05 (all previous tasks)
