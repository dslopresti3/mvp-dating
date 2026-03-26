import type { Event } from "@/types";

import type { EventDataSource, EventQuery, EventSourceName } from "../types";

export type TicketingProvider = "seatgeek" | "ticketmaster";

type TicketingSourceOptions = {
  provider: TicketingProvider;
  apiKey?: string;
};

type TicketingEventRecord = {
  id: string;
  title: string;
  league: Event["league"];
  teams: string[];
  date: string;
  time: string;
  venue: string;
  borough_or_area: string;
  average_ticket_price: number;
  vibe: string;
  description: string;
};

const mapTicketingRecordToEvent = (record: TicketingEventRecord): Event => ({
  id: record.id,
  title: record.title,
  league: record.league,
  teams: record.teams,
  date: record.date,
  time: record.time,
  venue: record.venue,
  borough_or_area: record.borough_or_area,
  average_ticket_price: record.average_ticket_price,
  vibe: record.vibe,
  description: record.description,
});

class TicketingEventSource implements EventDataSource {
  public readonly name: EventSourceName = "ticketing";

  public constructor(private readonly options: TicketingSourceOptions) {}

  async listEvents(query?: EventQuery): Promise<Event[]> {
    void query;
    if (!this.options.apiKey) {
      return [];
    }

    return [];
  }

  async getEventById(id: string) {
    const events = await this.listEvents();
    return events.find((event) => event.id === id);
  }

  // Placeholder mapper for future provider SDK/API responses.
  protected normalize(record: TicketingEventRecord) {
    return mapTicketingRecordToEvent(record);
  }
}

export const createTicketingEventSource = (options: TicketingSourceOptions) => new TicketingEventSource(options);
