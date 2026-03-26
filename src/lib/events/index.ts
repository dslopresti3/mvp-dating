import type { Event } from "@/types";

import { createHybridEventSource } from "./sources/hybrid-event-source";
import { mockEventSource } from "./sources/mock-event-source";
import { createTicketingEventSource } from "./sources/ticketing-event-source";
import type { EventDataSource, EventQuery, EventSourceName } from "./types";

const eventSourceFromEnv = (process.env.EVENT_SOURCE ?? "mock") as EventSourceName;

const ticketingSource = createTicketingEventSource({
  provider: (process.env.TICKETING_PROVIDER as "seatgeek" | "ticketmaster" | undefined) ?? "seatgeek",
  apiKey: process.env.TICKETING_API_KEY,
});

const resolveDataSource = (): EventDataSource => {
  switch (eventSourceFromEnv) {
    case "ticketing":
      return ticketingSource;
    case "hybrid":
      return createHybridEventSource(ticketingSource, mockEventSource);
    case "mock":
    default:
      return mockEventSource;
  }
};

const getContext = () => ({
  nowIsoDate: new Date().toISOString().slice(0, 10),
});

export const listEvents = async (query?: EventQuery): Promise<Event[]> => {
  return resolveDataSource().listEvents(query, getContext());
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
  return resolveDataSource().getEventById(id, getContext());
};

export type { EventDataSource, EventQuery, EventSourceName };
