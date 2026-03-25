import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { events, starterChats, starterMatches } from "@/lib/mock-data";

const intentLabels: Record<string, string> = {
  have_tickets: "I already have tickets",
  buy_tickets: "I'll buy tickets",
  exploring: "Just exploring",
};

const dateStyleLabels: Record<string, string> = {
  one_on_one: "1:1 date",
  group_hang: "Group hang",
  open_either: "Open either",
};

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ eventId?: string; intent?: string; dateStyle?: string }>;
}) {
  const { eventId, intent, dateStyle } = await searchParams;

  const selectedEvent = eventId ? events.find((event) => event.id === eventId) : undefined;
  const selectedIntent = intent ? intentLabels[intent] : undefined;
  const selectedDateStyle = dateStyle ? dateStyleLabels[dateStyle] : undefined;

  return (
    <>
      <PageHeader
        title="Your matches"
        subtitle="People who align with your event plans and energy."
      />

      {selectedEvent ? (
        <SectionCard
          title="Current matching context"
          description={`${selectedEvent.title} • ${selectedEvent.venue}`}
        >
          <div className="space-y-1 text-sm text-zinc-700">
            {selectedIntent ? <p>Intent: {selectedIntent}</p> : null}
            {selectedDateStyle ? <p>Date style: {selectedDateStyle}</p> : null}
          </div>
        </SectionCard>
      ) : null}

      <div className="space-y-4">
        {starterMatches.map((match) => {
          const chat = starterChats.find((entry) => entry.matchId === match.id);

          return (
            <SectionCard key={match.id} title={match.name} description={match.vibe}>
              {chat ? (
                <Link
                  href={`/chat/${chat.id}`}
                  className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                >
                  Open chat
                </Link>
              ) : (
                <p className="text-sm text-zinc-600">Chat will unlock after your first event check-in.</p>
              )}
            </SectionCard>
          );
        })}
      </div>
    </>
  );
}
