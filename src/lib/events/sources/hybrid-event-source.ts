import type { EventDataSource } from "../types";

export const createHybridEventSource = (
  primary: EventDataSource,
  fallback: EventDataSource,
): EventDataSource => ({
  name: "hybrid",
  async listEvents(query, context) {
    const liveEvents = await primary.listEvents(query, context);

    if (liveEvents.length > 0) {
      return liveEvents;
    }

    return fallback.listEvents(query, context);
  },
  async getEventById(id, context) {
    const liveEvent = await primary.getEventById(id, context);

    if (liveEvent) {
      return liveEvent;
    }

    return fallback.getEventById(id, context);
  },
});
