'use client';

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/EmptyState";
import { EventCard } from "@/components/EventCard";
import { FilterChip } from "@/components/FilterChip";
import { PageHeader } from "@/components/PageHeader";
import { events } from "@/lib/mock-data";
import type { Event } from "@/types";

type DiscoverFilter = "Tonight" | "This week" | "Under $50" | "Hype" | "Chill" | "Unique" | "Premium";

const discoverFilters: DiscoverFilter[] = ["Tonight", "This week", "Under $50", "Hype", "Chill", "Unique", "Premium"];

const seedTonight = "2026-05-06";
const seedWeekEnd = "2026-05-12";

const filterPredicates: Record<DiscoverFilter, (event: Event) => boolean> = {
  Tonight: (event) => event.date === seedTonight,
  "This week": (event) => event.date >= seedTonight && event.date <= seedWeekEnd,
  "Under $50": (event) => event.average_ticket_price < 50,
  Hype: (event) => ["high-energy", "electric", "loud", "chant-heavy"].includes(event.vibe),
  Chill: (event) => ["social", "upbeat", "community-forward"].includes(event.vibe),
  Unique: (event) => event.league === "PWHL" || event.league === "WNBA",
  Premium: (event) => event.average_ticket_price >= 120 || event.vibe === "premium",
};

export default function DiscoverPage() {
  const [selectedFilters, setSelectedFilters] = useState<DiscoverFilter[]>([]);

  const filteredEvents = useMemo(() => {
    if (selectedFilters.length === 0) {
      return events;
    }

    return events.filter((event) => selectedFilters.every((filter) => filterPredicates[filter](event)));
  }, [selectedFilters]);

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
              selected={selectedFilters.includes(filter)}
              onClick={() => toggleFilter(filter)}
            />
          </li>
        ))}
      </ul>

      <section className="space-y-5 pb-2" aria-label="Event feed">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        {filteredEvents.length === 0 ? (
          <EmptyState
            title="No events match these filters"
            description="Try removing one filter to reveal more event options for this week."
          />
        ) : null}
      </section>
    </>
  );
}
