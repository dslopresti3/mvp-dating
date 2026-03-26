import { events as seededEvents } from "@/lib/mock-data";

import type { EventDataSource, EventQuery } from "../types";

const applyQuery = (events: typeof seededEvents, query?: EventQuery) => {
  if (!query) {
    return events;
  }

  return events.filter((event) => {
    if (query.fromDate && event.date < query.fromDate) {
      return false;
    }

    if (query.toDate && event.date > query.toDate) {
      return false;
    }

    if (query.leagues && query.leagues.length > 0 && !query.leagues.includes(event.league)) {
      return false;
    }

    if (query.city && query.city.toLowerCase() !== "new-york-city") {
      return false;
    }

    return true;
  });
};

export const mockEventSource: EventDataSource = {
  name: "mock",
  async listEvents(query) {
    return applyQuery(seededEvents, query);
  },
  async getEventById(id) {
    return seededEvents.find((event) => event.id === id);
  },
};
