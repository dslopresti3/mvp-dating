'use client';

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import {
  readSelectionState,
  saveSelectionState,
  type DateStyleValue,
  type IntentValue,
} from "@/lib/mvp-selection";
import { events, starterChats, starterMatches } from "@/lib/mock-data";

const intentLabels: Record<IntentValue, string> = {
  have_tickets: "I already have tickets",
  buy_tickets: "I'll buy tickets",
  exploring: "Just exploring",
};

const dateStyleLabels: Record<DateStyleValue, string> = {
  one_on_one: "1:1 date",
  group_hang: "Group hang",
  open_either: "Open either",
};

export function MatchesClient() {
  const searchParams = useSearchParams();

  const selection = useMemo(() => {
    const savedSelection = readSelectionState();

    return {
      eventId: searchParams.get("eventId") ?? savedSelection.eventId,
      intent: (searchParams.get("intent") ?? savedSelection.intent) as IntentValue,
      dateStyle: (searchParams.get("dateStyle") ?? savedSelection.dateStyle) as DateStyleValue,
    };
  }, [searchParams]);

  useEffect(() => {
    saveSelectionState(selection);
  }, [selection]);

  const selectedEvent = events.find((event) => event.id === selection.eventId);
  const selectedIntent = intentLabels[selection.intent];
  const selectedDateStyle = dateStyleLabels[selection.dateStyle];

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
            <p>Intent: {selectedIntent}</p>
            <p>Date style: {selectedDateStyle}</p>
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
