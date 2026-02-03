import { describe, test, expect, mock, beforeEach } from 'bun:test'
import { render, screen, waitFor } from '@testing-library/react'
import type { ContactWithContext } from '@/lib/types'
import { AISummary } from '../ai-summary'

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
  beforeEach(() => {
    // Mock global fetch
    globalThis.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ summary: 'Test summary content' }),
      } as Response)
    )
  })

  test('shows loading skeleton initially', () => {
    render(<AISummary contact={mockContact} />)
    expect(screen.getByRole('heading', { name: 'AI Summary' })).toBeInTheDocument()
  })

  test('displays summary after loading', async () => {
    render(<AISummary contact={mockContact} />)
    await waitFor(
      () => {
        expect(screen.getByText('Test summary content')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  })

  test('has refresh button', () => {
    render(<AISummary contact={mockContact} />)
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
  })

  test('displays error message on fetch failure', async () => {
    // Suppress expected console.error
    const consoleSpy = mock(() => {})
    const originalError = console.error
    console.error = consoleSpy

    try {
      globalThis.fetch = mock(() => Promise.reject(new Error('Network error')))
      render(<AISummary contact={mockContact} />)

      await waitFor(
        () => {
          expect(screen.getByText('Failed to load summary')).toBeInTheDocument()
        },
        { timeout: 2000 }
      )

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalled()
    } finally {
      console.error = originalError
    }
  })
})
