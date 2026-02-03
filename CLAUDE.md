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

**Note:** Do not run `bun dev` - the user manages the dev server manually.

```bash
# Build & Production
bun run build        # Production build
bun start            # Run production server

# Quality
bun run lint         # ESLint
bun run typecheck    # TypeScript check (tsc --noEmit)
bunx biome check src/        # Biome linting and formatting check
bunx biome check --write src/  # Auto-fix Biome issues
```

## Code Quality

Biome is configured in `biome.json` with:
- Only checks `src/` (ignores `.next/`, `node_modules/`)
- Tailwind CSS directive support enabled
- A11y rules set to warnings (not errors)
- CSS linting/formatting disabled (Tailwind handles it)
- Tab indentation, double quotes, semicolons required

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

**CRITICAL: All colors MUST use design tokens. NEVER use hardcoded hex values or generic Tailwind color classes.**

### Color Tokens (Defined in `src/styles/design-tokens.css`)

**Core Palette (6 colors):**
- **Background:** `#212121` → Use `bg-background`
- **Card Background:** `#292929` → Use `bg-card`
- **Borders/Muted:** `#333333` → Use `border-border` or `bg-muted`
- **Primary Text:** `#f0f0f0` → Use `text-foreground`
- **Muted Text:** `#aaaaaa` → Use `text-muted-foreground`
- **Primary Blue:** `#5A92FF` → Use `bg-[var(--color-primary)]` or `border-[var(--color-primary)]`

**Status Colors:**
- **Success (Green):** `#588205` → Use `bg-status-success` / `text-status-success`
- **Warning (Amber):** `#f59e0b` → Use `bg-status-warning` / `text-status-warning`
- **Danger (Red):** `#b20a53` → Use `bg-status-danger` / `text-status-danger`

**Accent Colors:**
- **Accent Pink:** `#ec4899` → Use `bg-accent` / `text-accent`
- **Link Cyan:** `#38bdf8` → Use `text-link`

### Available Tailwind Utilities

```tsx
// Backgrounds
bg-background        // #212121 - main background
bg-card             // #292929 - card backgrounds
bg-muted            // #333333 - hover states, subtle backgrounds

// Text
text-foreground          // #f0f0f0 - primary text (headings, labels)
text-muted-foreground    // #aaaaaa - secondary text (descriptions, metadata)

// Borders
border-border       // #333333 - all borders

// Status Colors
bg-status-success / text-status-success    // #588205 - green status
bg-status-warning / text-status-warning    // #f59e0b - amber status
bg-status-danger / text-status-danger      // #b20a53 - red status

// Links & Accents
text-link           // #38bdf8 - clickable links
text-accent         // #ec4899 - accent elements
bg-accent          // #ec4899 - accent backgrounds

// Glade Primary Blue (use CSS var syntax)
bg-[var(--color-primary)]     // #5A92FF - buttons, badges, active states
border-[var(--color-primary)] // #5A92FF - active borders
```

### What NOT to Do

❌ **NEVER use hardcoded hex values:**
```tsx
// BAD
<div className="bg-[#212121]">
<div className="text-[#f0f0f0]">
```

❌ **NEVER use generic Tailwind color classes:**
```tsx
// BAD
<div className="bg-gray-900 text-white border-gray-700">
<span className="text-green-400">
<div className="bg-red-500">
```

❌ **NEVER use white opacity patterns for structural colors:**
```tsx
// BAD
<div className="bg-white/5 border-white/10">
```

✅ **ALWAYS use design tokens:**
```tsx
// GOOD
<div className="bg-background text-foreground border-border">
<span className="text-status-success">
<div className="bg-status-danger">
```

### Special Cases

**Glade Primary Blue (#5A92FF):**
Must use CSS variable syntax because it differs from shadcn's pink primary:
```tsx
// Correct
bg-[var(--color-primary)]
border-[var(--color-primary)]

// Wrong - this uses shadcn's pink #ec4899
bg-primary
border-primary
```

**Avatar Colors:**
Dynamic runtime values are OK:
```tsx
<div style={{ backgroundColor: contact.avatarColor }}>
```

### Token File Locations

- **Token Definitions:** `src/styles/design-tokens.css` - Source of truth for all color values
- **Tailwind Integration:** `src/app/globals.css` - Maps tokens to Tailwind utilities via `@theme inline`
- **Usage:** Import happens automatically, just use the utility classes listed above

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
