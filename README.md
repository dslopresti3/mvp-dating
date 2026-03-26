# Stadium Date MVP

Stadium Date is an **event-first dating app**: users pick a live event first, then discover compatible people who want to attend that same event.

Instead of starting with endless profile swiping, the product starts with a shared plan in the real world — a game night in New York.

---

## Product Concept

Stadium Date is designed around one core belief:

> Dates are easier to start when both people already want to be at the same place.

For this MVP, users can:

1. Choose a city (New York City in v1)
2. Browse live sports events
3. Pick an event and set their ticket/date intent
4. View compatible people for that exact event
5. Open a mocked chat preview from a match

This creates a clear, low-friction flow from **interest → plan → connection**.

---

## Why Event-First

Traditional dating products often optimize for profile browsing before context exists.

Stadium Date flips that model:

- **Shared context first**: both people selected the same live event
- **Better conversation starters**: the event, teams, venue, and vibe create natural topics
- **More actionable matching**: intent (have tickets, buying tickets, exploring) helps align expectations
- **Stronger real-world outcomes**: every match is anchored to a specific night out

Event-first helps reduce the ambiguity of “what do we even do?” and makes planning feel immediate.

---

## MVP Launch Wedge: New York Sports

The initial launch wedge is **New York sports events** across multiple leagues.

This wedge works because it combines:

- Dense local event supply
- Strong team identities and fan communities
- A wide ticket-price spectrum (affordable to premium)
- Natural variety in date vibes (chill, loud, high-energy, premium)

Current seeded leagues/events include MLB, NBA, NHL, WNBA, MLS, and PWHL in the NYC metro area.

---

## Route Overview

The app uses the Next.js App Router and ships a compact set of core routes:

- `/` — Home onboarding for city + event-type framing
- `/discover` — Event feed with quick filters
- `/events/[id]` — Event detail + decision panel (ticket intent + date style)
- `/matches` — Compatibility results for the selected event
- `/chat/[id]` — Mocked conversation preview
- `/profile` — Lightweight profile centered on event preferences

---

## Component Structure

UI is organized into reusable, mobile-first building blocks under `src/components`.

### Layout & Navigation
- `PageHeader` — consistent page-level title/subtitle shell
- `BottomNav` — persistent navigation for key routes
- `SectionCard` — reusable content container sections

### Event Discovery & Decisioning
- `EventCard` — event summary card in discover feed
- `FilterChip` / `ChipList` — quick selection and tagging UI
- `EventDecisionPanel` — selection state before entering matches
- `IntentSelector` — ticket-intent choice block

### Matching & Profile
- `MatchesClient` — compatibility computation and match listing
- `MatchCard` — individual candidate presentation
- `ProfilePreferenceBlock` — reusable profile settings section
- `EmptyState` — standardized fallback/zero-state UI

This keeps the codebase composable as the app expands beyond sports.

---

## Mock Data Overview

All MVP seed data lives in `src/lib` and is intentionally structured for easy replacement with real backend data.

- `src/lib/mock-data.ts`
  - `events`: NYC sports event inventory
  - `profiles`: sample user profiles with ticket budgets, vibe preferences, and interested event IDs
  - `eventInterests`: derived profile↔event relationships
  - `chatThreads` / `starterChats`: mocked messaging content
  - selectors/helpers: `getEventById`, `getProfilesForEvent`, etc.

- `src/lib/mvp-selection.ts`
  - localStorage-backed event/intention/date-style selection state for flow continuity

- `src/lib/navigation.ts`
  - bottom-nav route definitions

- `src/lib/profile-preferences.ts`
  - reusable profile preference labels displayed in profile UI

---

## Setup Instructions

### Prerequisites
- Node.js 20+
- npm (or your preferred package manager)

### Install
```bash
npm install
```

### Run in development
```bash
npm run dev
```

Open http://localhost:3000.

### Production build
```bash
npm run build
npm run start
```

### Lint
```bash
npm run lint
```

---

## Future Roadmap

After validating the NYC sports wedge, Stadium Date expands the event graph and core platform capabilities.

### New event categories
- Concerts
- Comedy
- Festivals

### Platform upgrades
- Real ticketing integration
- Authentication
- Real messaging backend

These steps transition the MVP from a sports-led prototype into a general event-based dating platform.

---

## Mission Reminder

Stadium Date is not trying to be another swipe-first app.

It is building a premium, mobile-first experience where **the event is the anchor**, and connection follows from shared plans in the real world.
