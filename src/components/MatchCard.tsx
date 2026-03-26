'use client';

import { AvatarPlaceholder } from "@/components/AvatarPlaceholder";

type MatchCardProps = {
  profileId: string;
  name: string;
  age: number;
  bio: string;
  eventTitle: string;
  eventVenue: string;
  eventDate: string;
  eventTime: string;
  eventRelevance: string;
  intentLabel: string;
  vibeAligned: boolean;
  canMatch: boolean;
  isMatching: boolean;
  onMatch: (profileId: string) => void;
};

const formatEventDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

export function MatchCard({
  profileId,
  name,
  age,
  bio,
  eventTitle,
  eventVenue,
  eventDate,
  eventTime,
  eventRelevance,
  intentLabel,
  vibeAligned,
  canMatch,
  isMatching,
  onMatch,
}: MatchCardProps) {
  return (
    <article className="app-card space-y-5">
      <div className="app-surface">
        <p className="app-eyebrow">Event match</p>
        <p className="mt-1 text-[15px] font-semibold text-zinc-900">{eventTitle}</p>
        <p className="mt-1 text-sm text-zinc-600">
          {formatEventDate(eventDate)} · {eventTime} · {eventVenue}
        </p>
        <p className="mt-2 text-sm font-medium text-zinc-700">{eventRelevance}</p>
      </div>

      <div className="flex items-start gap-3.5">
        <AvatarPlaceholder name={name} />
        <div className="min-w-0 space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            {name}, {age}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700">
              Intent: {intentLabel}
            </span>
            {vibeAligned ? (
              <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Vibe aligned
              </span>
            ) : null}
          </div>
          <p className="text-sm leading-6 text-zinc-600">{bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        <button
          type="button"
          className="app-button-secondary-muted w-full"
          aria-label={`Pass on ${name}`}
        >
          Pass
        </button>
        <button
          type="button"
          className="app-button-primary w-full px-3 disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={!canMatch || isMatching}
          onClick={() => onMatch(profileId)}
          aria-label={canMatch ? `Match with ${name}` : `${name} has no chat thread yet`}
        >
          {isMatching ? 'Opening chat...' : canMatch ? 'Match' : 'No chat yet'}
        </button>
        <button
          type="button"
          className="app-button-secondary-muted w-full"
          aria-label={`Save ${name} for later`}
        >
          Save
        </button>
      </div>
    </article>
  );
}
