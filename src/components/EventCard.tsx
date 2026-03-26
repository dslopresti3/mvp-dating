import Link from "next/link";

import type { Event } from "@/types";

type EventCardProps = {
  event: Event;
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

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="app-card app-section">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">{event.league}</p>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">{event.title}</h2>
        </div>
        <span className="rounded-full bg-zinc-900 px-3 py-1.5 text-[11px] font-semibold text-white">
          {formatVibe(event.vibe)}
        </span>
      </div>

      <div className="space-y-1.5 text-[15px] text-zinc-600">
        <p className="font-medium text-zinc-800">
          {formatEventDate(event.date)} • {event.time}
        </p>
        <p>{event.venue}</p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-600">
          Avg ticket <span className="text-base font-semibold text-zinc-900">${event.average_ticket_price}</span>
        </p>
        <Link
          href={`/events/${event.id}`}
          className="app-button-primary"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
