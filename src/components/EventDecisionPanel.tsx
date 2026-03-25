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
    <div className="space-y-5 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <IntentSelector
        title="Your plan for tickets"
        options={intentOptions.map((option) => ({ ...option }))}
        selectedValue={intent}
        onSelect={(value) => setIntent(value as IntentValue)}
      />

      <section className="space-y-3" aria-label="Date style">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-800">Date style</h2>
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
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white"
      >
        See compatible people
      </Link>
    </div>
  );
}
