# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interview demo for Glade.ai - a Contact Overview feature that gives bankruptcy attorneys instant visibility into client status. The feature adds:
1. **Status badges** (green/amber/red) in contact sidebar and header
2. **Overview tab** with AI-generated summary, pending items, follow-up history, and escalation suggestions

This is a standalone demo replicating Glade's UI style, not an integration with their codebase.

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- AI SDK (`ai` package) with gpt-4o-mini
- No database - mock data only

## Commands

```bash
# Development
bun dev              # Start dev server on localhost:3000

# Build & Production
bun run build        # Production build
bun start            # Run production server

# Quality
bun run lint         # ESLint
bun run typecheck    # TypeScript check (tsc --noEmit)
```

## Architecture

```
src/
├── app/
│   ├── page.tsx                    # Redirects to /contacts
│   ├── contacts/
│   │   └── page.tsx                # Contact list view
│   └── contact/[id]/
│       ├── layout.tsx              # Header + tab navigation
│       ├── page.tsx                # Overview tab (default)
│       └── [tab]/page.tsx          # Other tabs (minimal)
├── components/
│   ├── status-badge.tsx            # Reusable status indicator
│   ├── contact-sidebar.tsx         # Left panel with contact list
│   ├── contact-header.tsx          # Name, email, breadcrumb, status
│   ├── tab-navigation.tsx          # Tab bar component
│   └── overview/                   # Overview tab components
│       ├── ai-summary.tsx          # GPT-generated summary card
│       ├── pending-items.tsx       # Docs/forms/invoices status
│       ├── followup-history.tsx    # Timeline of interactions
│       └── suggested-action.tsx    # Escalation suggestion (conditional)
├── lib/
│   ├── ai.ts                       # OpenAI API integration
│   ├── status.ts                   # Status calculation logic
│   ├── mock-data.ts                # Fake contacts and conversations
│   └── types.ts                    # TypeScript interfaces
```

## Status Logic

Priority order (highest wins):
1. **Needs attention** (red): 3+ follow-ups AND 10+ days no response, OR overdue items
2. **Waiting for you** (amber): Client action pending your response (uploaded doc, sent message)
3. **Waiting for them** (green): Follow-up sent within 7 days, awaiting client action

## AI Integration

Single prompt that receives contact context (conversations, documents, forms, invoices, notes) and returns:
- 2-3 sentence summary
- Suggested escalation message (if status is "needs attention")

Use streaming for the summary to show loading state.

## Design System

Match Glade's existing UI:
- **Background:** `#0d0d0d` (near black)
- **Cards:** `#1a1a1a` with subtle borders
- **Accent:** Pink/magenta (`#ec4899` or similar)
- **Text:** White primary, gray-400 secondary
- **Avatars:** Colored circle with initials

## Mock Data Contacts

| Name | Status | Scenario |
|------|--------|----------|
| Maria Garcia | 🔴 Needs attention | 3 follow-ups, no response in 12 days |
| John Smith | 🟢 Waiting for them | Recent follow-up, on track |
| David Chen | 🟡 Waiting for you | Uploaded documents, needs review |
| Sarah Johnson | 🟢 Waiting for them | All good, awaiting final docs |
| Robert Wilson | 🔴 Needs attention | Overdue invoice + missing docs |

## Key Patterns

- Server components by default, client components only for interactivity
- AI calls happen server-side via Server Actions or Route Handlers
- Status calculation is pure function in `lib/status.ts`
- All mock data centralized in `lib/mock-data.ts`
