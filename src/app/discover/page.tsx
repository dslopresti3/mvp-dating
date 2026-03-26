'use client';

import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/components/EmptyState";
import { EventCard } from "@/components/EventCard";
import { FilterChip } from "@/components/FilterChip";
import { PageHeader } from "@/components/PageHeader";
import { events as seededEvents } from "@/lib/mock-data";
import type { Event } from "@/types";

type DiscoverFilter = "Tonight" | "This week" | "Under $50" | "Hype" | "Chill" | "Unique" | "Premium";

type EventsResponse = {
  data?: Event[];
};

const discoverFilters: DiscoverFilter[] = ["Tonight", "This week", "Under $50", "Hype", "Chill", "Unique", "Premium"];

const getDateWindow = (events: Event[]) => {
  const sortedEventDates = events
    .map((event) => event.date)
    .sort((left, right) => left.localeCompare(right));

  const seedTonight = sortedEventDates[0] ?? "";

  const seedWeekEnd = (() => {
    if (!seedTonight) {
      return "";
    }

    const lastDay = new Date(`${seedTonight}T00:00:00`);
    lastDay.setDate(lastDay.getDate() + 6);
    return lastDay.toISOString().slice(0, 10);
  })();

  return {
    seedTonight,
    seedWeekEnd,
  };
};

const buildFilterPredicates = (events: Event[]): Record<DiscoverFilter, (event: Event) => boolean> => {
  const { seedTonight, seedWeekEnd } = getDateWindow(events);

  return {
    Tonight: (event) => event.date === seedTonight,
    "This week": (event) => event.date >= seedTonight && event.date <= seedWeekEnd,
    "Under $50": (event) => event.average_ticket_price < 50,
    Hype: (event) => ["high-energy", "electric", "loud", "chant-heavy"].includes(event.vibe),
    Chill: (event) => ["social", "upbeat", "community-forward"].includes(event.vibe),
    Unique: (event) => event.league === "PWHL" || event.league === "WNBA",
    Premium: (event) => event.average_ticket_price >= 120 || event.vibe === "premium",
  };
};

export default function DiscoverPage() {
  const [selectedFilters, setSelectedFilters] = useState<DiscoverFilter[]>([]);
  const [events, setEvents] = useState<Event[]>(seededEvents);

  useEffect(() => {
    let isActive = true;

    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events", { cache: "no-store" });
        const payload = (await response.json()) as EventsResponse;

        if (!isActive || !response.ok || !payload.data || payload.data.length === 0) {
          return;
        }

        setEvents(payload.data);
      } catch {
        // Keep seeded events as a safe fallback for the MVP.
      }
    };

    void loadEvents();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    if (selectedFilters.length === 0) {
      return events;
    }

    const filterPredicates = buildFilterPredicates(events);

    return events.filter((event) => selectedFilters.every((filter) => filterPredicates[filter](event)));
  }, [events, selectedFilters]);

  const toggleFilter = (filter: DiscoverFilter) => {
    setSelectedFilters((current) =>
      current.includes(filter) ? current.filter((value) => value !== filter) : [...current, filter],
    );
  };

  return (
    <>
      <PageHeader
        title="This Week in NYC"
        subtitle="Find your event first, then meet someone who wants the same vibe."
      />

      <ul className="flex flex-wrap gap-x-2.5 gap-y-3" aria-label="Discover filters">
        {discoverFilters.map((filter) => (
          <li key={filter}>
            <FilterChip
              label={filter}
              isSelected={selectedFilters.includes(filter)}
              onSelect={() => toggleFilter(filter)}
            />
          </li>
        ))}
        {selectedFilters.length > 0 ? (
          <li>
            <button
              type="button"
              onClick={() => setSelectedFilters([])}
              className="app-button-secondary-muted px-4"
            >
              Clear filters
            </button>
          </li>
        ) : null}
      </ul>

      <section className="space-y-5 pb-2" aria-label="Event feed">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        {filteredEvents.length === 0 ? (
          <EmptyState
            title="No events match these filters"
            description="Try removing one filter to reveal more event options for this week."
            icon="🔎"
          />
        ) : null}
      </section>
    </>
  );
}
