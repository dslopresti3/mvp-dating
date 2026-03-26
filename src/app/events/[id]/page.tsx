import { notFound } from "next/navigation";

import { EventDecisionPanel } from "@/components/EventDecisionPanel";
import { EventQuickFacts } from "@/components/EventQuickFacts";
import { PageHeader } from "@/components/PageHeader";
import { formatEventDateLong } from "@/lib/formatting";
import { getEventById, getProfilesForEvent } from "@/lib/mock-data";

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
        subtitle={`${formatEventDateLong(event.date)} • ${event.time}`}
        badge={event.league}
      />

      <section className="app-card space-y-4">
        <EventQuickFacts
          ticketPrice={event.average_ticket_price}
          vibe={event.vibe}
          venue={event.venue}
          area={event.borough_or_area}
        />

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
          <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500">Event snapshot</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-700">{event.description}</p>
        </div>

        <p className="text-sm text-zinc-700">
          <span className="font-semibold text-zinc-900">{interestedUsers}</span> people are already interested
          in this event.
        </p>
      </section>

      <section className="app-card space-y-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">Next step</p>
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Set your intent and date style</h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Pick the options below to instantly see the most compatible people for this game.
        </p>
      </section>

      <EventDecisionPanel eventId={event.id} />
    </>
  );
}
