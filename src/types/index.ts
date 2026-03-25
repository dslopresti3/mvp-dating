export type NavItem = {
  href: string;
  label: string;
};

export type EventSummary = {
  id: string;
  title: string;
  league: string;
  venue: string;
  date: string;
};

export type MatchSummary = {
  id: string;
  name: string;
  eventId: string;
  vibe: string;
};

export type ChatSummary = {
  id: string;
  matchId: string;
  name: string;
  teaser: string;
};
