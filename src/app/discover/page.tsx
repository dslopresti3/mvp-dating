import { ChipList } from "@/components/ChipList";
import { EventCard } from "@/components/EventCard";
import { PageHeader } from "@/components/PageHeader";
import { events } from "@/lib/mock-data";

const discoverFilters = ["Tonight", "This week", "Under $50", "Hype", "Chill", "Unique", "Premium"];

export default function DiscoverPage() {
  return (
    <>
      <PageHeader
        title="This Week in NYC"
        subtitle="Find your event first, then meet someone who wants the same vibe."
      />

      <ChipList items={discoverFilters} />

      <section className="space-y-4 overflow-y-auto pb-2" aria-label="Event feed">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </>
  );
}
