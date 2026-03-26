import Link from "next/link";

import type { Event } from "@/types";
import { EventThumbnail } from "@/components/EventThumbnail";

type EventCardProps = {
  event: Event;
};

type EventMetaPillProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

const formatEventDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

const formatVibe = (vibe: string) =>
  vibe
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function EventMetaPill({ label, value, valueClassName }: EventMetaPillProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
      <p className="app-eyebrow">{label}</p>
      <p className={`mt-1 text-[15px] font-medium text-zinc-900 ${valueClassName ?? ""}`}>{value}</p>
    </div>
  );
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="app-card space-y-5">
      <EventThumbnail league={event.league} title={event.title} venue={event.venue} />

      <div className="flex items-start justify-between gap-3">
        <div className="app-section-heading min-w-0 flex-1">
          <p className="app-eyebrow">{event.league}</p>
          <h2 className="text-xl font-semibold leading-tight tracking-tight text-zinc-900">{event.title}</h2>
        </div>
        <span className="inline-flex shrink-0 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-700">
          {formatVibe(event.vibe)}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        <EventMetaPill label="Date" value={formatEventDate(event.date)} />
        <EventMetaPill label="Time" value={event.time} />
        <EventMetaPill label="Venue" value={event.venue} />
        <EventMetaPill
          label="Avg ticket"
          value={`$${event.average_ticket_price}`}
          valueClassName="text-base font-semibold"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-zinc-600">
          Vibe <span className="font-semibold text-zinc-900">{formatVibe(event.vibe)}</span>
        </p>
        <Link href={`/events/${event.id}`} className="app-button-primary w-full">
          View details
        </Link>
      </div>
    </article>
  );
}
