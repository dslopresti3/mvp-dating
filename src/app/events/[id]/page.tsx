import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { featuredEvents, starterMatches } from "@/lib/mock-data";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = featuredEvents.find((entry) => entry.id === id);

  if (!event) {
    notFound();
  }

  const relatedMatches = starterMatches.filter((match) => match.eventId === event.id);

  return (
    <>
      <PageHeader
        title={event.title}
        subtitle={`${event.venue} • ${event.date}`}
        badge={event.league}
      />

      <SectionCard
        title="Event overview"
        description="Placeholder details for schedules, seat zones, and meetup options."
      />

      <SectionCard
        title="Potential matches"
        description="Starter profiles attending this event."
      >
        <ul className="space-y-2">
          {relatedMatches.length ? (
            relatedMatches.map((match) => (
              <li key={match.id} className="rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700">
                <p className="font-medium text-zinc-900">{match.name}</p>
                <p>{match.vibe}</p>
              </li>
            ))
          ) : (
            <li className="text-sm text-zinc-600">No starter matches yet for this event.</li>
          )}
        </ul>
      </SectionCard>
    </>
  );
}
