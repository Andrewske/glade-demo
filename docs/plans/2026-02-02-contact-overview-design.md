# Contact Overview Feature Design

**Date:** 2026-02-02
**Purpose:** Interview demo for Glade.ai - small feature addition

## Overview

Add a Contact Overview tab and status badge system to give attorneys instant visibility into client status without clicking through multiple tabs.

## Problem

Attorneys have to click through 9 tabs (Information, Conversation, Documents, Forms, Workflows, Invoices, Order History, AI Follow-up Cadence, Notes) to understand "where are we with this client?"

## Solution

### 1. Status Badge System

Three states displayed in contact sidebar and contact header:

| Status | Color | Trigger |
|--------|-------|---------|
| **Waiting for you** | Amber | Client responded, attorney hasn't taken action. Document uploaded pending review. |
| **Waiting for them** | Green | Follow-up sent within last 7 days, awaiting response/documents/payment |
| **Needs attention** | Red | 3+ follow-ups sent, 10+ days no response, OR overdue items |

**Priority logic:**
- "Needs attention" > "Waiting for you" > "Waiting for them"

**Placement:**
- Contact sidebar: colored dot next to contact name
- Contact header: badge next to name

### 2. Overview Tab

New tab positioned first (before Information). Contains:

#### AI Summary Card
2-3 sentence synthesis of: conversations, documents status, forms status, invoices, notes.

Example:
> Maria is a Chapter 7 bankruptcy client who has been responsive throughout the process. She's uploaded 4/6 required documents and completed her questionnaire. Outstanding: pay stubs (last 6 months) and bank statements. Last note mentions she's waiting on her employer for pay stub copies.

#### Pending Items
Quick view of what's outstanding:
- Documents: X missing
- Forms: Complete/Incomplete
- Invoices: $X unpaid

Each with [View] link to respective tab.

#### Follow-up History
Timeline of recent interactions:
- Date + type (AI follow-up sent, client responded, etc.)
- Last 4-5 entries

#### Suggested Action (Conditional)
Only appears when status is "Needs attention".

Shows AI-generated escalation message with different approach than automated follow-ups.

Example:
> Multiple follow-ups haven't gotten a response. Try a different approach:
> 
> "Hi Maria, I know gathering documents can be tough. Would a quick call help? I can walk you through exactly what we need from your employer."
>
> [Copy message] [Send via SMS]

## Technical Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- AI SDK with gpt-4o-mini
- Mock data (no real database)

## Project Structure

```
glade-demo/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Contact list view
│   │   └── contact/[id]/
│   │       ├── page.tsx          # Contact detail (tabs)
│   │       └── layout.tsx        # Shared header/tabs
│   ├── components/
│   │   ├── status-badge.tsx
│   │   ├── contact-sidebar.tsx
│   │   ├── contact-header.tsx
│   │   ├── tab-navigation.tsx
│   │   ├── overview/
│   │   │   ├── ai-summary.tsx
│   │   │   ├── pending-items.tsx
│   │   │   ├── followup-history.tsx
│   │   │   └── suggested-action.tsx
│   │   └── ui/                   # Shared UI components
│   ├── lib/
│   │   ├── ai.ts                 # OpenAI API calls
│   │   ├── status-logic.ts       # Status calculation
│   │   └── mock-data.ts          # Fake contacts
│   └── types/
│       └── index.ts              # TypeScript interfaces
```

## Mock Data

4-5 contacts demonstrating different states:
1. Green - "Waiting for them" - recent follow-up, awaiting docs
2. Amber - "Waiting for you" - client uploaded docs, needs review
3. Red - "Needs attention" - multiple follow-ups, no response
4. Green - "Waiting for them" - everything on track
5. Red - "Needs attention" - overdue invoice + missing docs

## UI Design Reference

Match Glade's existing design:
- Dark theme (#0d0d0d background)
- Pink/magenta accent color
- Clean, minimal cards
- 2-column layouts for data fields
- Avatar with initials (colored background)

## Demo Flow

1. Show contact list with status dots visible
2. "Notice Maria has a red indicator - needs attention"
3. Click Maria → lands on Overview tab
4. "AI summarized her situation, shows pending items, follow-up history"
5. "Since she's not responding, here's a suggested escalation"
6. Show status badge in header
7. Click through to other tabs (minimal implementation)

## Out of Scope

- Real database/persistence
- Actual SMS sending
- Full implementation of other tabs
- Authentication
- Multi-tenant architecture
