# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic research survey application studying AI bias and political preferences. Users complete a multi-step survey with AI chatbot interactions, where the AI personality (Republican/Democrat/Control) and information conditions are randomized per user.

## Commands

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Prisma generate + Next.js build
npm run lint         # ESLint (next/core-web-vitals)
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma db push   # Push schema changes to database
```

## Architecture

**Next.js 15 App Router** with TypeScript strict mode. Path alias `@/*` maps to `./src/*`.

### Survey Flow

Consent form (home page) → randomize user → step-1 through step-11 → completion. Each step has a page component and API route. Page order is randomized per user via `user_page_order` in the database.

### Routing & Auth

- `redirectCheck()` (src/redirectCheck.ts) enforces that users are logged in and on their correct step — called in every page's server component
- User ID stored in a secure cookie after consent
- `incrementUserPage.ts` advances user progress after each step submission
- Middleware captures request URL in `x-url` header for routing verification

### API Pattern

- Form submissions: `/step-{N}/api/`
- AI chat: `/step-{N}/api/ai/` using `MakeAiRoute(questionIndex)` factory that creates parameterized streaming handlers
- Chat endpoints use Edge runtime with OpenAI GPT-4o-mini streaming via the `ai` library

### AI Conditions (Prisma enums)

- `AiModelType`: Republican, Democrat, Control — determines system prompt personality
- `ExtraInfoType`: Control, Basic, Informative, Directed, Video — information condition
- `ControlSubtype`: None, Republican, Democrat — sub-randomization for Control group

### Database

Prisma + PostgreSQL. Key models: `user_page_tracking` (session/progress/randomization), `form_response` (survey answers), `conversation` (chat logs as JSON), `randomized_user_questions` (per-user question selection).

### Shared Components

- `src/CommonComponents.tsx`: Main layout wrapper, PageTitle, FormSubmit button, MyLink
- `src/Chatbox.tsx` / `src/ChatboxDefaultInput.tsx`: Chat UI for AI interaction steps
- `src/OnAScale.tsx`: Likert scale rating component
- `src/components/ui/`: Radix UI primitive wrappers (shadcn/ui pattern)

### Form Validation

react-hook-form + zod schemas on all survey forms. Schemas defined in each step's page file or shared modules.

### Analytics

PostHog (proxied through Next.js rewrites in next.config.ts) + Vercel Analytics.
