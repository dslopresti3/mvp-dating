import type { Event } from "@/types";

export type EventSourceName = "mock" | "hybrid" | "ticketing";

export type EventQuery = {
  city?: string;
  fromDate?: string;
  toDate?: string;
  leagues?: string[];
};

export type EventSourceContext = {
  nowIsoDate: string;
};

export interface EventDataSource {
  readonly name: EventSourceName;
  listEvents(query?: EventQuery, context?: EventSourceContext): Promise<Event[]>;
  getEventById(id: string, context?: EventSourceContext): Promise<Event | undefined>;
}
