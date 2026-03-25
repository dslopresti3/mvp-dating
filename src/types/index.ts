export type NavItem = {
  href: string;
  label: string;
};

export type Event = {
  id: string;
  title: string;
  league: "MLB" | "NHL" | "NBA" | "WNBA" | "MLS" | "PWHL";
  teams: string[];
  date: string;
  time: string;
  venue: string;
  borough_or_area: string;
  average_ticket_price: number;
  vibe: string;
  description: string;
};

export type UserProfile = {
  id: string;
  first_name: string;
  age: number;
  city: string;
  favorite_teams: string[];
  bio: string;
  ticket_budget: number;
  preferred_vibe: string;
  interested_event_ids: string[];
  intent: "long_term" | "relationship" | "casual" | "new_friends";
};

export type EventInterest = {
  id: string;
  profile_id: string;
  event_id: string;
  interest_level: "high" | "medium" | "low";
  note?: string;
};

export type ChatMessage = {
  id: string;
  thread_id: string;
  sender_profile_id: string;
  text: string;
  sent_at: string;
};

export type ChatThread = {
  id: string;
  event_id: string;
  matched_profile_ids: [string, string];
  messages: ChatMessage[];
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
