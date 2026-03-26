# Stadium Date (MVP)

Stadium Date is an **event-first dating app**: users choose a live event first, then discover compatible people who want to attend that same event.

This repository is the MVP build focused on **New York sports** as the launch wedge.

## Product concept

Most dating products start with profile swiping. Stadium Date starts with a plan:

1. Pick an event
2. Set ticket/date intent
3. View compatible people for that exact event
4. Continue in a lightweight chat preview

The goal is simple: make connections easier by anchoring matches to a real-world night out.

## Why event-first

Event-first matching creates immediate shared context:

- Both people already chose the same event
- Conversation starts with a real plan (teams, venue, vibe)
- Ticket intent helps align expectations early
- Matches are more actionable than generic profile likes

## MVP launch wedge: New York sports

The MVP focuses on NYC-area sports events to validate core behavior in one dense market before broad expansion.

Why New York sports for v1:

- High event supply across leagues and venues
- Strong fan identity and built-in conversation topics
- Range of price points and date styles

Current mock events cover multiple NYC teams/leagues as sample inventory.

## Route overview

Built with the Next.js App Router:

- `/` — home and entry framing
- `/discover` — event feed + filters
- `/events/[id]` — event details + decision panel
- `/matches` — compatible people for selected event
- `/chat/[id]` — mocked chat thread
- `/profile` — event preference profile

## Reusable component overview

Core UI components live in `src/components` and are designed for mobile-first reuse:

- **Layout/navigation:** `PageHeader`, `BottomNav`, `SectionCard`
- **Discovery/events:** `EventCard`, `EventThumbnail`, `EventQuickFacts`, `FilterChip`, `ChipList`, `EventDecisionPanel`, `IntentSelector`
- **Matching/chat/profile:** `MatchesClient`, `MatchCard`, `ChatBubble`, `ProfilePreferenceBlock`, `AvatarPlaceholder`, `EmptyState`

## Mock data overview

MVP data and lightweight state helpers are in `src/lib`:

- `mock-data.ts` — seeded events, profiles, interests, chats, and selectors
- `mvp-selection.ts` — local selection state (event + intent + date style)
- `navigation.ts` — bottom-nav config
- `profile-preferences.ts` — profile preference labels/options

The app uses mock data only; there is no production backend in this version.

## Setup

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Build and run production mode

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Future roadmap

Planned post-MVP expansion:

- Event categories: **concerts, comedy, festivals**
- **Real ticketing integration**
- **Authentication**
- **Real messaging backend**
- **City expansion** beyond New York

---

Stadium Date MVP is intentionally scoped: event-first matching flows, reusable UI, and realistic mock data to validate product direction before full platform build-out.
