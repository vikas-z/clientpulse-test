# Contributing to ClientPulse

## Development Setup

1. Clone the repo and install dependencies
2. Copy `.env.example` to `.env.local` and fill in values
3. Run `npx prisma migrate dev` to set up the database
4. Run `npm run dev` to start the dev server

## Branch Naming

- `feat/description` for features
- `fix/description` for bug fixes
- `chore/description` for maintenance

## Commit Messages

Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`

## Pull Requests

- All PRs require one approving review
- CI must pass before merge
- Squash merge to main
