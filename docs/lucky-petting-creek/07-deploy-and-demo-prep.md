# Deploy and Demo Prep

## Files to Modify/Create
- `README.md` (new)
- `vercel.json` (new - optional)
- `.env.local.example` (verify exists)

## Implementation Details

### 1. Vercel Deployment

**Connect to Vercel**
```bash
bunx vercel
```

Follow prompts:
- Link to existing project or create new
- Framework: Next.js (auto-detected)
- Build command: `bun run build`
- Output directory: `.next`

**Environment Variables**
In Vercel dashboard, add:
- `OPENAI_API_KEY` (optional - for live AI)

**Deploy**
```bash
bunx vercel --prod
```

### 2. README.md

```markdown
# Glade.ai Contact Overview Demo

A demo feature for Glade.ai showing a Contact Overview tab with AI-powered client status summaries.

## Features

- **Status Badges**: Green/Amber/Red indicators showing client status at a glance
- **AI Summary**: GPT-4o-mini generated summaries of client situations
- **Pending Items**: Quick view of documents, forms, and invoices status
- **Follow-up History**: Timeline of recent client interactions
- **Suggested Actions**: AI-generated escalation messages for unresponsive clients

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Vercel AI SDK

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/glade-demo.git
cd glade-demo

# Install dependencies
bun install

# Start dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## AI Integration (Optional)

The demo works without any API keys using mock data. To enable real AI summaries:

1. Copy `.env.local.example` to `.env.local`
2. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Restart the dev server

## Demo Walkthrough

1. **Contact List**: Notice the colored status dots next to each contact
2. **Maria Garcia (Red)**: Click to see a client needing attention
3. **Overview Tab**: AI summary, pending items, follow-up history
4. **Suggested Action**: AI-generated escalation message (only for red status)
5. **David Chen (Amber)**: Client waiting for attorney review
6. **John Smith (Green)**: Client on track, awaiting their action

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/           # shadcn components
│   └── overview/     # Overview tab cards
├── lib/              # Utilities and mock data
└── actions/          # Server actions (AI)
```

## Design

UI matches Glade's existing design system:
- Dark theme (#0d0d0d background)
- Pink accent (#ec4899)
- Clean, minimal cards

## Author

Built by [Your Name] as an interview demo for Glade.ai
```

### 3. Testing Checklist

**With API Key**
- [ ] Clone repo fresh
- [ ] `bun install && bun dev`
- [ ] Add `OPENAI_API_KEY` to `.env.local`
- [ ] Navigate to contact - verify AI streams
- [ ] Click refresh - verify regeneration

**Without API Key**
- [ ] Clone repo fresh
- [ ] `bun install && bun dev` (no .env.local)
- [ ] Navigate to contact - verify fallback summary
- [ ] No console errors

**Production**
- [ ] Deploy to Vercel
- [ ] Test live URL
- [ ] Share with someone else - verify it works
- [ ] Mobile responsive check

### 4. Demo Script

**Opening (30 seconds)**
> "I built a Contact Overview feature for Glade. The problem: attorneys click through 9 tabs to understand client status. My solution: a single Overview tab with AI-powered summaries."

**Status Indicators (30 seconds)**
> "Notice the colored dots in the sidebar. Red means needs attention, amber means waiting for you, green means waiting for them. Maria has a red indicator - let's see why."

**Overview Tab (1 minute)**
> "The Overview tab synthesizes everything:
> - AI Summary pulls from conversations, documents, invoices
> - Pending Items shows what's outstanding at a glance
> - Follow-up History shows recent interactions
> - Since Maria needs attention, there's a Suggested Action with a different approach than automated follow-ups."

**Technical Highlights (30 seconds)**
> "Built with Next.js 16, TypeScript, Tailwind v4, and the Vercel AI SDK for streaming. The AI fallback means it works without an API key - just clone and run."

**Closing (15 seconds)**
> "This demonstrates the kind of productivity features that could reduce attorney time per client while improving outcomes."

### 5. Screenshots

Take screenshots for the repo:
1. Contact list with status dots
2. Overview tab for red-status contact
3. Mobile responsive view
4. AI streaming in action (if possible)

Save to `docs/screenshots/` and reference in README.

## Acceptance Criteria
- [ ] Deployed to Vercel and accessible
- [ ] Works for others who visit the URL
- [ ] README explains setup and features
- [ ] Demo script practiced and timed (~3 minutes)
- [ ] Screenshots in repo

## Dependencies
- Task 01-06 (all implementation complete)
