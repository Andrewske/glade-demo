import { describe, test, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '../status-badge'

describe('StatusBadge', () => {
  test('renders dot variant with correct title for needs-attention', () => {
    const { container } = render(<StatusBadge status="needs-attention" variant="dot" />)
    const dot = container.querySelector('div[title="Needs attention"]')
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveClass('bg-red-500')
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
