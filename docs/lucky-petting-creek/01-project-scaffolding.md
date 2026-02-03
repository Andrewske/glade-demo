# Project Scaffolding

## Files to Modify/Create
- `package.json` (new - via create-next-app)
- `tailwind.config.ts` (modify - add Glade colors)
- `components.json` (new - shadcn config)
- `src/styles/design-tokens.css` (new - CSS custom properties)
- `public/glade-logo.avif` (copy from docs/)
- `src/` folder structure (new)

## Implementation Details

### 1. Create Next.js Project
```bash
bunx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
Select: Next.js 16, TypeScript, Tailwind v4, App Router, src/ directory

### 2. Initialize shadcn/ui
```bash
bunx shadcn@latest init
```
- Style: Default
- Base color: Slate
- CSS variables: Yes

### 3. Install shadcn Components
```bash
bunx shadcn@latest add button card badge avatar skeleton tabs scroll-area separator sheet
```

### 3b. Install Additional Dependencies
```bash
bun add react-toastify zod
```
- `react-toastify`: Toast notifications for user-facing errors
- `zod`: Schema validation for AI structured output

### 4. Configure Tailwind with Glade Colors
Update `tailwind.config.ts`:
```typescript
colors: {
  background: '#0d0d0d',
  card: '#1a1a1a',
  'card-hover': '#242424',
  border: '#2a2a2a',
  accent: '#ec4899',
  'accent-hover': '#db2777',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
}
```

### 5. CSS Design Tokens (`src/styles/design-tokens.css`)

Custom CSS properties mirroring Glade's design token approach:

```css
:root {
  /* Colors - Primary palette */
  --color-background: #0d0d0d;
  --color-card: #1a1a1a;
  --color-card-hover: #242424;
  --color-border: #2a2a2a;

  /* Accent colors */
  --color-accent: #ec4899;
  --color-accent-hover: #db2777;

  /* Status colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  /* Text colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #9ca3af;
  --color-text-muted: #6b7280;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
}
```

Import in `src/app/globals.css`:
```css
@import './styles/design-tokens.css';
```

Reference tokens in Tailwind config to bridge both approaches:
```typescript
// tailwind.config.ts
colors: {
  background: 'var(--color-background)',
  card: 'var(--color-card)',
  // ... etc
}
```

### 6. Copy Glade Logo
```bash
cp docs/glade-logo.avif public/
```

### 7. Create Folder Structure
```bash
mkdir -p src/components/ui
mkdir -p src/components/overview
mkdir -p src/lib/data
mkdir -p src/styles
mkdir -p src/actions
```

## Acceptance Criteria
- [ ] `bun dev` starts without errors
- [ ] Dark theme applied globally (background: #0d0d0d)
- [ ] shadcn components available for import
- [ ] CSS custom properties defined and importable
- [ ] Tailwind config references CSS variables
- [ ] Glade logo accessible at `/glade-logo.avif`
- [ ] TypeScript strict mode enabled
- [ ] react-toastify and zod installed

## Dependencies
None - this is the first task.
