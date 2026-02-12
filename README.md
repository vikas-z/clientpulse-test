# ClientPulse

> A modern client feedback and project analytics platform for freelancers and agencies.

## Overview

ClientPulse helps freelancers and agencies collect structured feedback from clients, track project health metrics, and generate professional handoff documentation. Built with Next.js 14, Prisma, and PostgreSQL.

## Features

- **Client Portal** — Branded feedback collection forms clients can access via unique links
- **Dashboard Analytics** — Real-time NPS scores, satisfaction trends, and response rates
- **Project Timeline** — Visual timeline of milestones, feedback, and deliverables
- **Stripe Billing** — Subscription management with usage-based pricing
- **Email Notifications** — Automated reminders for pending feedback requests
- **CSV Export** — Download all feedback data for external analysis
- **Multi-language** — UI available in English, Spanish, and French (i18n)
- **API Rate Limiting** — Token-bucket rate limiter for all public endpoints

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.3 |
| Database | PostgreSQL 15 via Supabase |
| ORM | Prisma 5.8 |
| Auth | NextAuth.js v5 (Google + GitHub OAuth) |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| Payments | Stripe SDK + Webhooks |
| Email | Resend + React Email |
| Hosting | Vercel (Edge + Serverless) |
| Monitoring | Sentry |
| CI/CD | GitHub Actions |

## Architecture

```
┌─────────────────────────────────────────────┐
│                 Vercel Edge                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Next.js  │  │ API      │  │ Webhooks  │ │
│  │ Frontend │  │ Routes   │  │ (Stripe)  │ │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘ │
│       │              │              │       │
│  ┌────┴──────────────┴──────────────┴─────┐ │
│  │         Prisma ORM + Middleware        │ │
│  └────────────────┬───────────────────────┘ │
└───────────────────┼─────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │  PostgreSQL (Supabase)│
        └───────────────────────┘
```

## Getting Started

### Prerequisites

- Node.js >= 18.17
- PostgreSQL 15+ (or Supabase project)
- Stripe account (test mode)
- Google OAuth credentials
- GitHub OAuth app

### Installation

```bash
git clone https://github.com/your-org/clientpulse.git
cd clientpulse
npm install
cp .env.example .env.local
# Fill in your environment variables
npx prisma migrate dev
npm run dev
```

### Environment Variables

See `.env.example` for all required variables. Key ones:

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Random secret for session encryption
- `STRIPE_SECRET_KEY` — Stripe API secret key
- `RESEND_API_KEY` — Email service API key

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Auth pages (login, register)
│   ├── (dashboard)/     # Protected dashboard routes
│   │   ├── clients/     # Client management
│   │   ├── feedback/    # Feedback collection & review
│   │   ├── analytics/   # Charts & metrics
│   │   └── settings/    # Account & billing settings
│   ├── api/
│   │   ├── auth/        # NextAuth endpoints
│   │   ├── clients/     # Client CRUD
│   │   ├── feedback/    # Feedback submission & retrieval
│   │   ├── webhooks/    # Stripe webhooks
│   │   └── export/      # CSV export endpoint
│   └── portal/[slug]/   # Public client feedback portal
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── dashboard/       # Dashboard-specific components
│   ├── feedback/        # Feedback form components
│   └── charts/          # Recharts wrappers
├── lib/
│   ├── prisma.ts        # Prisma client singleton
│   ├── auth.ts          # NextAuth config
│   ├── stripe.ts        # Stripe helpers
│   ├── email.ts         # Email templates & sending
│   └── rate-limit.ts    # Token-bucket rate limiter
└── prisma/
    ├── schema.prisma    # Database schema
    └── seed.ts          # Dev seed data
```

## Deployment

Deployed on Vercel with automatic preview deployments for PRs.

```bash
vercel --prod
```

### Database Migrations

```bash
npx prisma migrate deploy
```

## Known Issues

- Mobile Safari: feedback form date picker may not render correctly on iOS < 16
- Stripe webhook retry handling needs improvement for idempotency
- Dashboard chart loading can be slow with > 1000 feedback entries (pagination WIP)
- CSV export times out for accounts with > 5000 records

## Team

- **Arjun Mehta** — Tech Lead, architecture, backend
- **Sarah Chen** — Backend engineer, API, database, billing
- **Marcus Johnson** — Frontend engineer, UI/UX, components

## License

Proprietary — © 2026 ClientPulse Inc. All rights reserved.
