'use client';

type MatchCardProps = {
  profileId: string;
  name: string;
  age: number;
  bio: string;
  eventContext: string;
  intentLabel: string;
  vibeAligned: boolean;
  canMatch: boolean;
  isMatching: boolean;
  onMatch: (profileId: string) => void;
};

export function MatchCard({
  profileId,
  name,
  age,
  bio,
  eventContext,
  intentLabel,
  vibeAligned,
  canMatch,
  isMatching,
  onMatch,
}: MatchCardProps) {
  return (
    <article className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-lg font-semibold text-zinc-700"
          aria-hidden
        >
          {name.slice(0, 1)}
        </div>
        <div className="min-w-0 space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            {name}, {age}
          </h2>
          <p className="text-sm font-medium text-zinc-700">{eventContext}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white">
              {intentLabel}
            </span>
            {vibeAligned ? (
              <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Vibe aligned
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <p className="text-sm leading-6 text-zinc-600">{bio}</p>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          className="rounded-full border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700"
        >
          Pass
        </button>
        <button
          type="button"
          className="rounded-full bg-zinc-900 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={!canMatch || isMatching}
          onClick={() => onMatch(profileId)}
        >
          {isMatching ? "Opening chat..." : canMatch ? "Match" : "No chat yet"}
        </button>
        <button
          type="button"
          className="rounded-full border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700"
        >
          Save for later
        </button>
      </div>
    </article>
  );
}
