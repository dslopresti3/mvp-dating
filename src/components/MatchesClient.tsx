'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { EmptyState } from "@/components/EmptyState";
import { MatchCard } from "@/components/MatchCard";
import { PageHeader } from "@/components/PageHeader";
import {
  defaultSelectionState,
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

const isIntentValue = (value: string): value is IntentValue =>
  value === "have_tickets" || value === "buy_tickets" || value === "exploring";

const isDateStyleValue = (value: string): value is DateStyleValue =>
  value === "one_on_one" || value === "group_hang" || value === "open_either";

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
  const [matchError, setMatchError] = useState<string | null>(null);

  const selection = useMemo(() => {
    const savedSelection = readSelectionState();
    const queryIntent = searchParams.get("intent");
    const queryDateStyle = searchParams.get("dateStyle");
    const queryEventId = searchParams.get("eventId");

    return {
      eventId: queryEventId ?? savedSelection.eventId,
      intent: queryIntent && isIntentValue(queryIntent) ? queryIntent : savedSelection.intent,
      dateStyle:
        queryDateStyle && isDateStyleValue(queryDateStyle) ? queryDateStyle : savedSelection.dateStyle,
    };
  }, [searchParams]);

  useEffect(() => {
    saveSelectionState(selection);
  }, [selection]);

  const selectedEvent = events.find((event) => event.id === selection.eventId);
  const hasSelectedEventId = selection.eventId.trim().length > 0;
  const hasInvalidEventId = hasSelectedEventId && !selectedEvent;

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

  const profilesWithoutThreads = useMemo(
    () => compatibleMatches.filter(({ profile }) => !chatIdByMatchId[profile.id]),
    [chatIdByMatchId, compatibleMatches],
  );

  const handleMatch = (profileId: string) => {
    const targetChatId = chatIdByMatchId[profileId];

    if (!targetChatId) {
      setMatchError("Chat preview is not available for this match yet.");
      return;
    }

    setMatchError(null);
    setMatchingProfileId(profileId);
    router.push(`/chat/${targetChatId}`);
  };

  const resetSelectionAndGoDiscover = () => {
    saveSelectionState(defaultSelectionState);
    router.push("/discover");
  };

  return (
    <>
      <PageHeader
        title="Compatible for this event"
        subtitle={selectedEvent?.title ?? "Choose an event to unlock matches."}
      />

      {selectedEvent ? (
        <p className="text-[15px] leading-6 text-zinc-600">
          Showing people who also picked <span className="font-semibold text-zinc-900">{selectedEvent.title}</span>.
        </p>
      ) : hasInvalidEventId ? (
        <EmptyState
          title="This event is no longer available"
          description="Your saved event link looks outdated. Pick another event to refresh your compatible list."
          actionHref="/discover"
          actionLabel="Pick an event"
        />
      ) : (
        <EmptyState
          title="No selected event yet"
          description="Pick an event first, then we can show compatible people headed to that same night out."
          actionHref="/discover"
          actionLabel="Browse events"
        />
      )}

      {selectedEvent ? (
        <section className="space-y-5" aria-label="Compatible matches list">
          {matchError ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {matchError}
            </div>
          ) : null}

          {profilesWithoutThreads.length > 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
              Some matches do not have a chat thread yet. You can still browse and pick another event anytime.
            </div>
          ) : null}

          {compatibleMatches.map(({ profile, vibeAligned }) => (
            <MatchCard
              key={profile.id}
              profileId={profile.id}
              name={profile.first_name}
              age={profile.age}
              eventTitle={selectedEvent.title}
              eventVenue={selectedEvent.venue}
              eventDate={selectedEvent.date}
              eventTime={selectedEvent.time}
              eventRelevance={
                vibeAligned
                  ? "Shared event pick + matching crowd vibe"
                  : "Shared event pick for the same night out"
              }
              bio={profile.bio}
              intentLabel={intentLabels[profile.intent]}
              vibeAligned={vibeAligned}
              canMatch={Boolean(chatIdByMatchId[profile.id])}
              isMatching={matchingProfileId === profile.id}
              onMatch={handleMatch}
            />
          ))}

          {compatibleMatches.length === 0 ? (
            <EmptyState
              title="No compatible profiles right now"
              description="Try another event or adjust your date intent to open up more potential matches."
              actionHref="/discover"
              actionLabel="Pick another event"
            />
          ) : null}
        </section>
      ) : hasInvalidEventId ? (
        <button
          type="button"
          onClick={resetSelectionAndGoDiscover}
          className="app-button-primary"
        >
          Reset selection
        </button>
      ) : null}
    </>
  );
}
