# AI Integration

## Files to Modify/Create
- `src/actions/generate-summary.ts` (new)
- `src/lib/ai.ts` (new)
- `src/components/overview/ai-summary.tsx` (modify - wire up streaming)
- `.env.local.example` (new)

## Implementation Details

### 1. Environment Setup

Create `.env.local.example`:
```
# Optional - enables real AI summaries
# Without this, fallback mock summaries are used
OPENAI_API_KEY=sk-...
```

### 2. AI Configuration (`src/lib/ai.ts`)

```typescript
import { openai } from '@ai-sdk/openai'

export const aiModel = openai('gpt-4o-mini')

export function hasOpenAIKey(): boolean {
  return !!process.env.OPENAI_API_KEY
}
```

### 3. Server Action (`src/actions/generate-summary.ts`)

Uses structured output with Zod schema for reliable parsing:

```typescript
'use server'

import { streamObject } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { z } from 'zod'
import { aiModel, hasOpenAIKey } from '@/lib/ai'
import { MOCK_SUMMARIES } from '@/lib/mock-data'
import type { ContactWithContext } from '@/lib/types'

// Zod schema for structured AI output
const summarySchema = z.object({
  summary: z.string().describe('2-3 sentence summary of client status'),
  escalation: z.string().optional().describe('Suggested escalation message for unresponsive clients'),
})

export type SummaryResult = z.infer<typeof summarySchema>

export async function generateContactSummary(contact: ContactWithContext) {
  // Fallback if no API key
  if (!hasOpenAIKey()) {
    const mock = MOCK_SUMMARIES[contact.id]
    return {
      type: 'static' as const,
      data: {
        summary: mock.summary,
        escalation: contact.status === 'needs-attention' ? mock.escalation : undefined
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
        prompt: buildPrompt(contact),
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

function buildPrompt(contact: ContactWithContext): string {
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

${contact.status === 'needs-attention' ? `
Also write a suggested escalation message that:
- Takes a different approach than automated follow-ups
- Is warm and helpful in tone
- Offers specific assistance
- Is ready to send via SMS
` : 'Do not include an escalation message.'}`
}
```

Note: The Zod schema handles output structure - no need for format instructions in the prompt.

### 4. Client Component Integration

Update `src/components/overview/ai-summary.tsx`:

```typescript
'use client'

import { useEffect, useState, useTransition } from 'react'
import { readStreamableValue } from 'ai/rsc'
import { toast } from 'react-toastify'
import { generateContactSummary, type SummaryResult } from '@/actions/generate-summary'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { RefreshCw } from 'lucide-react'
import type { ContactWithContext } from '@/lib/types'

interface AISummaryProps {
  contact: ContactWithContext
}

export function AISummary({ contact }: AISummaryProps) {
  const [data, setData] = useState<Partial<SummaryResult>>({})
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Inline async logic to avoid stale closure issues
  useEffect(() => {
    setData({})
    setError(null)

    startTransition(async () => {
      try {
        const result = await generateContactSummary(contact)

        if (result.type === 'static') {
          setData(result.data)
        } else {
          for await (const partialObject of readStreamableValue(result.stream)) {
            if (partialObject) {
              setData(partialObject)
            }
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to generate summary'
        setError(message)
        toast.error(message)
      }
    })
  }, [contact.id])

  const handleRefresh = () => {
    setData({})
    setError(null)

    startTransition(async () => {
      try {
        const result = await generateContactSummary(contact)

        if (result.type === 'static') {
          setData(result.data)
        } else {
          for await (const partialObject of readStreamableValue(result.stream)) {
            if (partialObject) {
              setData(partialObject)
            }
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to generate summary'
        setError(message)
        toast.error(message)
      }
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Summary</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isPending}
          aria-label="Refresh summary"
        >
          <RefreshCw className={isPending ? 'animate-spin' : ''} />
        </Button>
      </CardHeader>
      <CardContent>
        {isPending && !data.summary ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <p className="text-sm text-gray-300">{data.summary}</p>
        )}
      </CardContent>
    </Card>
  )
}
```

Note: The `contact` object is stable (from server), so `contact.id` in deps is sufficient. The async logic is inlined in useEffect to avoid stale closure bugs.

### 5. Structured Output (No Parsing Needed)

With `streamObject` and Zod schema, the AI returns typed objects directly:

```typescript
// The stream yields partial objects as they're generated:
// { summary: "Maria is..." }
// { summary: "Maria is a Chapter 7...", escalation: "Hi Maria..." }

// No regex parsing needed - Zod schema enforces structure
```

The `SuggestedAction` component can access `data.escalation` directly when available.

## Acceptance Criteria
- [ ] With `OPENAI_API_KEY`: Summary streams as structured object
- [ ] Without `OPENAI_API_KEY`: Fallback summary shows instantly
- [ ] Refresh button regenerates summary
- [ ] Loading skeleton shows during generation
- [ ] Escalation field populated for red-status contacts (via Zod schema)
- [ ] AI errors display toast notification and inline error state
- [ ] No console errors with or without API key

## Dependencies
- Task 01 (project scaffolding)
- Task 02 (types and mock data)
- Task 04 (overview components)
