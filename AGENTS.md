<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# AGENTS.md

## Project mission
Build an event-first dating app where users choose a live event first and then see compatible people for that event.

## Product framing
This is not a generic swipe-first dating app.
This is a city-based event dating app with New York sports as the MVP launch wedge.

## Build priorities
1. Mobile-first UX
2. Clean reusable components
3. Strong information hierarchy
4. Event-first flows
5. Easy future expansion from sports to all live events

## Tech stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui

## Working rules
- Keep code modular and easy to extend
- Prefer reusable components over duplication
- Keep mock data in dedicated files under `/lib`
- Avoid unnecessary dependencies
- Preserve working code unless there is a strong reason to replace it
- Make sure all routes render without runtime errors

## Visual guidance
The app should feel premium, clean, and modern.
Use large cards, rounded corners, clear spacing, and mobile-first layouts.
Do not overdesign with gradients or visual noise.

## Non-goals for v1
- Real auth
- Real payments
- Real messaging backend
- Live ticket purchasing
- Push notifications
- Geolocation requirements

## Testing checklist
- App boots locally
- All routes render
- Nav links work
- No broken imports
- No obvious TypeScript errors

