import { notFound } from "next/navigation";

import { ChipList } from "@/components/ChipList";
import { EventDecisionPanel } from "@/components/EventDecisionPanel";
import { PageHeader } from "@/components/PageHeader";
import { getEventById, getProfilesForEvent } from "@/lib/mock-data";

const formatEventDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const formatVibe = (vibe: string) =>
  vibe
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  const interestedUsers = getProfilesForEvent(event.id).length;

  return (
    <>
      <PageHeader
        title={event.title}
        subtitle={`${formatEventDate(event.date)} • ${event.time}`}
        badge={event.league}
      />

      <section className="app-card app-section">
        <div className="space-y-2">
          <p className="text-[15px] text-zinc-600">{event.venue}</p>
          <p className="text-[15px] text-zinc-600">
            Avg ticket <span className="font-semibold text-zinc-900">${event.average_ticket_price}</span>
          </p>
          <p className="text-[15px] text-zinc-600">
            <span className="font-semibold text-zinc-900">{interestedUsers}</span> people interested
          </p>
        </div>

        <ChipList items={[`Vibe: ${formatVibe(event.vibe)}`]} />

        <p className="text-sm leading-relaxed text-zinc-700">{event.description}</p>
      </section>

      <EventDecisionPanel eventId={event.id} />
    </>
  );
}
