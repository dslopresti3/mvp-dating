import type { ChatSummary, EventSummary, MatchSummary } from "@/types";

export const featuredEvents: EventSummary[] = [
  {
    id: "yankees-mets-2026-05-12",
    title: "Yankees vs Mets",
    league: "MLB",
    venue: "Yankee Stadium",
    date: "May 12, 2026",
  },
  {
    id: "knicks-celtics-2026-05-15",
    title: "Knicks vs Celtics",
    league: "NBA",
    venue: "Madison Square Garden",
    date: "May 15, 2026",
  },
  {
    id: "rangers-devils-2026-05-18",
    title: "Rangers vs Devils",
    league: "NHL",
    venue: "Madison Square Garden",
    date: "May 18, 2026",
  },
];

export const starterMatches: MatchSummary[] = [
  {
    id: "m1",
    name: "Taylor, 29",
    eventId: "yankees-mets-2026-05-12",
    vibe: "Loves baseball banter and rooftop postgame plans.",
  },
  {
    id: "m2",
    name: "Jordan, 31",
    eventId: "knicks-celtics-2026-05-15",
    vibe: "Courtside energy with a calm, thoughtful vibe.",
  },
];

export const starterChats: ChatSummary[] = [
  {
    id: "c1",
    matchId: "m1",
    name: "Taylor",
    teaser: "Want to meet at Gate 4 around 6:30?",
  },
  {
    id: "c2",
    matchId: "m2",
    name: "Jordan",
    teaser: "Team colors or neutral tonight?",
  },
];
