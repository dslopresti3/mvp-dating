'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MatchCard } from "@/components/MatchCard";
import { PageHeader } from "@/components/PageHeader";
import {
  readSelectionState,
  saveSelectionState,
  type DateStyleValue,
  type IntentValue,
} from "@/lib/mvp-selection";
import { events, profiles, starterChats } from "@/lib/mock-data";
import type { UserProfile } from "@/types";

const intentLabels: Record<UserProfile["intent"], string> = {
  long_term: "Long-term",
  relationship: "Relationship",
  casual: "Casual",
  new_friends: "New friends",
};

const intentCompatibilityMap: Record<IntentValue, UserProfile["intent"][]> = {
  have_tickets: ["relationship", "long_term"],
  buy_tickets: ["relationship", "long_term", "casual"],
  exploring: ["casual", "new_friends", "relationship"],
};

const dateStyleBoostVibes: Record<DateStyleValue, string[]> = {
  one_on_one: ["premium", "electric", "intense"],
  group_hang: ["social", "upbeat", "chant-heavy", "community-forward"],
  open_either: [],
};

const getCompatibilityScore = (
  profile: UserProfile,
  selectedEventId: string,
  selectedIntent: IntentValue,
  selectedEventVibe: string,
  selectedDateStyle: DateStyleValue,
) => {
  const sharesEvent = profile.interested_event_ids.includes(selectedEventId);

  if (!sharesEvent) {
    return -1;
  }

  const hasCompatibleIntent = intentCompatibilityMap[selectedIntent].includes(profile.intent);
  const hasVibeAlignment = profile.preferred_vibe === selectedEventVibe;
  const hasDateStyleAlignment =
    dateStyleBoostVibes[selectedDateStyle].length > 0 &&
    dateStyleBoostVibes[selectedDateStyle].includes(profile.preferred_vibe);

  return (
    100 +
    (hasCompatibleIntent ? 20 : 0) +
    (hasVibeAlignment ? 8 : 0) +
    (hasDateStyleAlignment ? 4 : 0) +
    Math.min(profile.ticket_budget / 100, 5)
  );
};

export function MatchesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [matchingProfileId, setMatchingProfileId] = useState<string | null>(null);

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

  const chatIdByMatchId = useMemo(() => {
    return starterChats.reduce<Record<string, string>>((acc, chat) => {
      acc[chat.matchId] = chat.id;
      return acc;
    }, {});
  }, []);

  const compatibleMatches = useMemo(() => {
    if (!selectedEvent) {
      return [];
    }

    return profiles
      .map((profile) => {
        const score = getCompatibilityScore(
          profile,
          selectedEvent.id,
          selection.intent,
          selectedEvent.vibe,
          selection.dateStyle,
        );

        return {
          profile,
          score,
          vibeAligned: profile.preferred_vibe === selectedEvent.vibe,
        };
      })
      .filter((entry) => entry.score >= 100)
      .sort((a, b) => b.score - a.score);
  }, [selectedEvent, selection.dateStyle, selection.intent]);

  const handleMatch = (profileId: string) => {
    const targetChatId = chatIdByMatchId[profileId] ?? starterChats[0]?.id;

    if (!targetChatId) {
      return;
    }

    setMatchingProfileId(profileId);
    router.push(`/chat/${targetChatId}`);
  };

  return (
    <>
      <PageHeader title="Compatible for this event" subtitle={selectedEvent?.title ?? "Select an event first."} />

      {selectedEvent ? (
        <p className="text-sm text-zinc-600">
          Showing people who also picked <span className="font-semibold text-zinc-900">{selectedEvent.title}</span>.
        </p>
      ) : null}

      <section className="space-y-4" aria-label="Compatible matches list">
        {compatibleMatches.map(({ profile, vibeAligned }) => (
          <MatchCard
            key={profile.id}
            profileId={profile.id}
            name={profile.first_name}
            age={profile.age}
            eventContext={`Also going to ${selectedEvent?.title} at ${selectedEvent?.venue}`}
            bio={profile.bio}
            intentLabel={intentLabels[profile.intent]}
            vibeAligned={vibeAligned}
            canMatch={Boolean(chatIdByMatchId[profile.id] ?? starterChats[0]?.id)}
            isMatching={matchingProfileId === profile.id}
            onMatch={handleMatch}
          />
        ))}

        {selectedEvent && compatibleMatches.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
            No compatible profiles yet for this event. Try changing your intent to see more options.
          </p>
        ) : null}
      </section>
    </>
  );
}
