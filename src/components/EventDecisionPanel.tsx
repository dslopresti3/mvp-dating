'use client';

import Link from "next/link";
import { useMemo, useState } from "react";

import { FilterChip } from "@/components/FilterChip";
import { IntentSelector } from "@/components/IntentSelector";
import {
  defaultSelectionState,
  type DateStyleValue,
  type IntentValue,
  readSelectionState,
  saveSelectionState,
} from "@/lib/mvp-selection";

type EventDecisionPanelProps = {
  eventId: string;
};

const intentOptions = [
  {
    value: "have_tickets",
    label: "I already have tickets",
    description: "Match with people ready to lock in plans quickly.",
  },
  {
    value: "buy_tickets",
    label: "I'll buy tickets",
    description: "Find someone aligned before deciding where to sit.",
  },
  {
    value: "exploring",
    label: "Just exploring",
    description: "Browse compatible people without immediate ticket pressure.",
  },
] as const;

const dateStyleOptions = [
  { value: "one_on_one", label: "1:1 date" },
  { value: "group_hang", label: "Group hang" },
  { value: "open_either", label: "Open either" },
] as const;

const getInitialSelection = (eventId: string) => {
  const savedSelection = readSelectionState();

  if (savedSelection.eventId === eventId) {
    return { intent: savedSelection.intent, dateStyle: savedSelection.dateStyle };
  }

  return { intent: defaultSelectionState.intent, dateStyle: defaultSelectionState.dateStyle };
};

export function EventDecisionPanel({ eventId }: EventDecisionPanelProps) {
  const [intent, setIntent] = useState<IntentValue>(() => getInitialSelection(eventId).intent);
  const [dateStyle, setDateStyle] = useState<DateStyleValue>(() => getInitialSelection(eventId).dateStyle);

  const ctaHref = useMemo(() => {
    saveSelectionState({ eventId, intent, dateStyle });

    const params = new URLSearchParams({
      eventId,
      intent,
      dateStyle,
    });

    return `/matches?${params.toString()}`;
  }, [dateStyle, eventId, intent]);

  return (
    <div className="app-card space-y-6">
      <IntentSelector
        title="Your plan for tickets"
        options={intentOptions.map((option) => ({ ...option }))}
        selectedValue={intent}
        onSelect={(value) => setIntent(value as IntentValue)}
      />

      <section className="space-y-3.5" aria-label="Date style">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-800">Date style</h2>
          <p className="text-sm text-zinc-600">What kind of plan feels right for this event?</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {dateStyleOptions.map((option) => (
            <li key={option.value}>
              <FilterChip
                label={option.label}
                selected={dateStyle === option.value}
                onClick={() => setDateStyle(option.value)}
              />
            </li>
          ))}
        </ul>
      </section>

      <Link
        href={ctaHref}
        className="app-button-primary h-13 w-full text-base shadow-[0_10px_22px_rgba(24,24,27,0.28)]"
      >
        See compatible people →
      </Link>

      <p className="text-center text-xs text-zinc-500">You can change these preferences later.</p>
    </div>
  );
}
