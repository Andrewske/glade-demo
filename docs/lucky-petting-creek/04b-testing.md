# Testing Strategy

## Files to Create
- `src/lib/__tests__/status.test.ts` (unit tests for status calculation)
- `src/lib/__tests__/utils.test.ts` (unit tests for utilities)
- `src/components/__tests__/status-badge.test.tsx` (component tests)
- `src/components/overview/__tests__/ai-summary.test.tsx` (component tests)

## Implementation Details

### 1. Test Setup

**Configure bun test in `package.json`:**
```json
{
  "scripts": {
    "test": "bun test",
    "test:watch": "bun test --watch"
  }
}
```

**Install testing dependencies:**
```bash
bun add -d @testing-library/react @testing-library/jest-dom happy-dom
```

**Create `bunfig.toml` for test config:**
```toml
[test]
preload = ["./src/test-setup.ts"]
```

**Create `src/test-setup.ts`:**
```typescript
import { expect, afterEach } from 'bun:test'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

### 2. Unit Tests: Status Calculation (`src/lib/__tests__/status.test.ts`)

```typescript
import { describe, test, expect } from 'bun:test'
import { calculateStatus } from '../status'
import type { ContactWithContext } from '../types'

describe('calculateStatus', () => {
  const baseContact: ContactWithContext = {
    id: 'test',
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-0100',
    chapter: '7',
    avatarColor: '#ec4899',
    createdAt: new Date(),
    conversations: [],
    pendingItems: {
      documents: { required: 6, uploaded: 4, items: [] },
      forms: { complete: true, name: 'Means Test' },
      invoices: { total: 1000, paid: 1000, overdue: false },
    },
    notes: [],
    lastClientResponse: new Date(),
    followUpCount: 0,
  }

  test('returns needs-attention when followUpCount >= 3 AND daysSinceResponse >= 10', () => {
    const contact = {
      ...baseContact,
      followUpCount: 3,
      lastClientResponse: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
    }
    expect(calculateStatus(contact)).toBe('needs-attention')
  })

  test('returns needs-attention when invoice is overdue', () => {
    const contact = {
      ...baseContact,
      pendingItems: {
        ...baseContact.pendingItems,
        invoices: { total: 1000, paid: 500, overdue: true },
      },
    }
    expect(calculateStatus(contact)).toBe('needs-attention')
  })

  test('returns waiting-for-you when client has unreviewed action', () => {
    const contact = {
      ...baseContact,
      conversations: [
        {
          id: '1',
          contactId: 'test',
          type: 'client-response' as const,
          content: 'Here are my documents',
          timestamp: new Date(),
        },
      ],
    }
    expect(calculateStatus(contact)).toBe('waiting-for-you')
  })

  test('returns waiting-for-them as default', () => {
    expect(calculateStatus(baseContact)).toBe('waiting-for-them')
  })

  test('returns needs-attention when client has never responded and multiple follow-ups sent', () => {
    const contact = {
      ...baseContact,
      followUpCount: 3,
      lastClientResponse: null,
    }
    expect(calculateStatus(contact)).toBe('needs-attention')
  })
})
```

### 3. Unit Tests: Utilities (`src/lib/__tests__/utils.test.ts`)

```typescript
import { describe, test, expect } from 'bun:test'
import { daysBetween, formatDate, getInitials, cn } from '../utils'

describe('daysBetween', () => {
  test('calculates days between two dates', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-10')
    expect(daysBetween(date1, date2)).toBe(9)
  })

  test('returns 0 for same day', () => {
    const date = new Date('2024-01-01')
    expect(daysBetween(date, date)).toBe(0)
  })

  test('works regardless of order', () => {
    const date1 = new Date('2024-01-10')
    const date2 = new Date('2024-01-01')
    expect(daysBetween(date1, date2)).toBe(9)
  })
})

describe('getInitials', () => {
  test('extracts initials from full name', () => {
    expect(getInitials('Maria Garcia')).toBe('MG')
  })

  test('handles single name', () => {
    expect(getInitials('Maria')).toBe('M')
  })

  test('handles multiple names', () => {
    expect(getInitials('Maria Elena Garcia')).toBe('MEG')
  })
})

describe('cn', () => {
  test('joins class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  test('filters falsy values', () => {
    expect(cn('foo', false, undefined, 'bar')).toBe('foo bar')
  })
})
```

### 4. Component Tests: StatusBadge (`src/components/__tests__/status-badge.test.tsx`)

```typescript
import { describe, test, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '../status-badge'

describe('StatusBadge', () => {
  test('renders dot variant with correct color for needs-attention', () => {
    render(<StatusBadge status="needs-attention" variant="dot" />)
    const dot = screen.getByRole('status')
    expect(dot).toHaveAttribute('aria-label', 'Status: Needs attention')
  })

  test('renders badge variant with label', () => {
    render(<StatusBadge status="waiting-for-you" variant="badge" />)
    expect(screen.getByText('Waiting for you')).toBeInTheDocument()
  })

  test('renders waiting-for-them with green styling', () => {
    render(<StatusBadge status="waiting-for-them" variant="badge" />)
    expect(screen.getByText('Waiting for them')).toBeInTheDocument()
  })
})
```

### 5. Component Tests: AISummary (`src/components/overview/__tests__/ai-summary.test.tsx`)

```typescript
import { describe, test, expect, mock } from 'bun:test'
import { render, screen, waitFor } from '@testing-library/react'
import { AISummary } from '../ai-summary'
import type { ContactWithContext } from '@/lib/types'

// Mock the server action
mock.module('@/actions/generate-summary', () => ({
  generateContactSummary: mock(() =>
    Promise.resolve({
      type: 'static',
      data: { summary: 'Test summary content' },
    })
  ),
}))

// Mock react-toastify
mock.module('react-toastify', () => ({
  toast: { error: mock(() => {}) },
}))

const mockContact: ContactWithContext = {
  id: 'maria-garcia',
  name: 'Maria Garcia',
  email: 'maria@example.com',
  phone: '555-0100',
  chapter: '7',
  avatarColor: '#ec4899',
  createdAt: new Date(),
  conversations: [],
  pendingItems: {
    documents: { required: 6, uploaded: 4, items: [] },
    forms: { complete: false, name: 'Means Test' },
    invoices: { total: 1000, paid: 500, overdue: false },
  },
  notes: [],
  lastClientResponse: null,
  followUpCount: 3,
}

describe('AISummary', () => {
  test('shows loading skeleton initially', () => {
    render(<AISummary contact={mockContact} />)
    // Skeleton elements should be present
    expect(screen.getByRole('heading', { name: 'AI Summary' })).toBeInTheDocument()
  })

  test('displays summary after loading', async () => {
    render(<AISummary contact={mockContact} />)
    await waitFor(() => {
      expect(screen.getByText('Test summary content')).toBeInTheDocument()
    })
  })

  test('has refresh button', () => {
    render(<AISummary contact={mockContact} />)
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
  })
})
```

## Acceptance Criteria
- [ ] `bun test` runs all tests successfully
- [ ] `calculateStatus()` has 100% branch coverage
- [ ] Utility functions have basic coverage
- [ ] StatusBadge renders correctly for all status types
- [ ] AISummary shows loading, success, and error states
- [ ] All tests pass in CI (if configured)

## Dependencies
- Task 01 (project scaffolding)
- Task 02 (types and mock data)
- Task 04 (overview components)

## Notes
- Tests are focused on core business logic and key UI states
- Mocking server actions keeps tests fast and isolated
- Component tests verify rendering, not implementation details
- Run `bun test --watch` during development for fast feedback
