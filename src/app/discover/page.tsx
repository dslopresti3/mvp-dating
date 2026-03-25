import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { featuredEvents } from "@/lib/mock-data";

export default function DiscoverPage() {
  return (
    <>
      <PageHeader
        title="Discover events"
        subtitle="Choose your event first, then meet compatible fans."
      />
      <div className="space-y-4">
        {featuredEvents.map((event) => (
          <SectionCard
            key={event.id}
            title={event.title}
            description={`${event.league} • ${event.venue}`}
            href={`/events/${event.id}`}
            ctaLabel="See details"
          >
            <p className="text-sm text-zinc-700">{event.date}</p>
          </SectionCard>
        ))}
      </div>
    </>
  );
}
