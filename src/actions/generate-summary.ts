'use server'

import { streamObject } from 'ai'
import { createStreamableValue } from '@ai-sdk/rsc'
import { z } from 'zod'
import { aiModel, hasOpenAIKey } from '@/lib/ai'
import { MOCK_SUMMARIES } from '@/lib/mock-data'
import { daysBetween } from '@/lib/utils'
import { calculateStatus } from '@/lib/status'
import type { ContactWithContext, ContactStatus } from '@/lib/types'

// Zod schema for structured AI output
const summarySchema = z.object({
  summary: z.string().describe('2-3 sentence summary of client status'),
  escalation: z.string().optional().describe('Suggested escalation message for unresponsive clients'),
})

export type SummaryResult = z.infer<typeof summarySchema>

export async function generateContactSummary(contact: ContactWithContext) {
  const status = calculateStatus(contact)

  // Fallback if no API key
  if (!hasOpenAIKey()) {
    const mock = MOCK_SUMMARIES[contact.id]
    return {
      type: 'static' as const,
      data: {
        summary: mock.summary,
        escalation: status === 'needs-attention' ? mock.escalation : undefined
      }
    }
  }

  // Real streaming response with structured output
  const stream = createStreamableValue<Partial<SummaryResult>>({})

  ;(async () => {
    try {
      const { partialObjectStream } = streamObject({
        model: aiModel,
        schema: summarySchema,
        prompt: buildPrompt(contact, status),
      })

      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject)
      }
      stream.done()
    } catch (error) {
      stream.error(error instanceof Error ? error : new Error('AI generation failed'))
    }
  })()

  return {
    type: 'stream' as const,
    stream: stream.value
  }
}

function buildPrompt(contact: ContactWithContext, status: ContactStatus): string {
  const daysSinceResponse = contact.lastClientResponse
    ? daysBetween(contact.lastClientResponse, new Date())
    : 'never responded'

  const recentConversations = contact.conversations
    .slice(-5)
    .map(c => `[${c.type}] ${c.content}`)
    .join('\n')

  return `You are summarizing a bankruptcy client's status for their attorney.

Client: ${contact.name} (Chapter ${contact.chapter})
Last response: ${daysSinceResponse} days ago
Follow-ups sent: ${contact.followUpCount}

Recent conversations:
${recentConversations}

Pending items:
- Documents: ${contact.pendingItems.documents.uploaded}/${contact.pendingItems.documents.required} uploaded
- Forms: ${contact.pendingItems.forms.complete ? 'Complete' : 'Incomplete'}
- Invoices: $${contact.pendingItems.invoices.total - contact.pendingItems.invoices.paid} unpaid${contact.pendingItems.invoices.overdue ? ' (OVERDUE)' : ''}

Notes: ${contact.notes.join('; ') || 'None'}

Write a 2-3 sentence summary focusing on:
1. Current case status
2. What's blocking progress
3. Any concerns

${status === 'needs-attention' ? `
Also write a suggested escalation message that:
- Takes a different approach than automated follow-ups
- Is warm and helpful in tone
- Offers specific assistance
- Is ready to send via SMS
` : 'Do not include an escalation message.'}`
}
