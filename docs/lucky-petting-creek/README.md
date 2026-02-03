# Contact Overview Feature - Implementation Plan

## Overview

Build a Contact Overview feature for Glade.ai as an interview demo. The feature gives bankruptcy attorneys instant visibility into client status without clicking through multiple tabs.

**Key Features:**
- Status badges (green/amber/red) in sidebar and header
- Overview tab with AI-generated summary
- Pending items view (docs, forms, invoices)
- Follow-up history timeline
- AI-suggested escalation messages for unresponsive clients

**Tech Stack:** Next.js 16, TypeScript, Tailwind v4 + CSS design tokens, shadcn/ui, Vercel AI SDK (gpt-4o-mini), bun test + React Testing Library

## Task Sequence

1. [01-project-scaffolding.md](./01-project-scaffolding.md) - Create Next.js project, install shadcn/ui, configure Tailwind with Glade colors and CSS design tokens
2. [02-types-and-mock-data.md](./02-types-and-mock-data.md) - Define TypeScript interfaces, create 5 mock contacts, implement status calculation and data layer
3. [03-layout-shell.md](./03-layout-shell.md) - Build icon rail, sidebar, header, tab navigation, and routing structure
4. [04-overview-tab-components.md](./04-overview-tab-components.md) - Create AI Summary, Pending Items, Follow-up History, and Suggested Action cards
5. [04b-testing.md](./04b-testing.md) - Unit tests for status logic, component tests for key UI (bun test + React Testing Library)
6. [05-ai-integration.md](./05-ai-integration.md) - Set up Vercel AI SDK with Zod structured output, error handling with toasts
7. [06-polish-and-accessibility.md](./06-polish-and-accessibility.md) - Add loading states, 404 pages, animations, mobile responsive, keyboard navigation
8. [07-deploy-and-demo-prep.md](./07-deploy-and-demo-prep.md) - Deploy to Vercel, write README, prepare demo script

## Success Criteria

### Functional
- [ ] Contact list shows 5 contacts with correct status dots
- [ ] Clicking contact shows Overview tab with AI summary
- [ ] AI summary streams (with API key) or shows fallback (without)
- [ ] Pending Items shows correct counts
- [ ] Follow-up History shows last 5 messages
- [ ] Suggested Action only appears for red-status contacts
- [ ] Tab navigation works (Overview + stubs)

### Technical
- [ ] TypeScript strict mode, no errors
- [ ] Works without any environment variables (fallback mode)
- [ ] Mobile responsive (sidebar as drawer)
- [ ] Tests pass (`bun test`)
- [ ] 404 handling for invalid routes
- [ ] Toast notifications for errors
- [ ] Deployed and accessible on Vercel

### Demo Ready
- [ ] README with setup instructions
- [ ] 3-minute demo script prepared
- [ ] Screenshots in repo

## Execution Instructions

1. Execute tasks in numerical order (01 → 07)
2. Each task file contains:
   - Files to modify/create
   - Implementation details
   - Acceptance criteria
   - Dependencies
3. Verify acceptance criteria before moving to next task

## Dependencies

**Required:**
- Bun (package manager/runtime)
- Node.js 18+

**Optional:**
- OpenAI API key (for real AI summaries; fallback works without)

**Reference Files:**
- Design doc: `docs/plans/2026-02-02-contact-overview-design.md`
- Screenshot: `docs/research/screenshots/screenshot-2026-02-02_16-14-44.png`
- Logo: `docs/glade-logo.avif`
