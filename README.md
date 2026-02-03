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

Built by Kevin Andrews as an interview demo for Glade.ai
