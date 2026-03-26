# Event Data Integration Plan (Incremental)

## What this phase introduces

- A provider-agnostic `EventDataSource` interface in `src/lib/events/types.ts`
- A seeded mock adapter (`mockEventSource`) that preserves current MVP behavior
- A ticketing adapter scaffold (`ticketing-event-source`) for SeatGeek/Ticketmaster-style providers
- A hybrid strategy (`createHybridEventSource`) that falls back to seeded data when live inventory is unavailable
- API endpoints (`/api/events`, `/api/events/[id]`) that hide provider details from UI routes

## Source selection

Use `EVENT_SOURCE`:

- `mock` (default): seeded inventory only
- `hybrid`: try ticketing source first, fallback to mock
- `ticketing`: ticketing source only

Optional provider env vars:

- `TICKETING_PROVIDER=seatgeek|ticketmaster`
- `TICKETING_API_KEY=...`

## Routes/components intentionally unchanged in this phase

To keep the seeded MVP stable, these views/components stay on existing mock-domain data:

- Matching and chat user logic (`src/components/MatchesClient.tsx`, `src/app/chat/[id]/page.tsx`)
- Profile page user+interest rendering (`src/app/profile/page.tsx`)
- Core visual components (`src/components/EventCard.tsx`, `src/components/EventQuickFacts.tsx`, `src/components/EventDecisionPanel.tsx`)

Only the event inventory read path is abstracted now.

## Next step (future live integration)

1. Implement provider HTTP client in `ticketing-event-source.ts`
2. Map provider payloads into the internal `Event` shape via `normalize`
3. Add city/date filters in provider requests
4. Add lightweight caching/revalidation policy for `/api/events`
5. Add telemetry for source coverage (live vs fallback)
