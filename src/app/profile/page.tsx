import { PageHeader } from "@/components/PageHeader";
import { ProfilePreferenceBlock } from "@/components/ProfilePreferenceBlock";
import { events, profiles } from "@/lib/mock-data";
import {
  profileDatePreferences,
  profileFavoriteLeagues,
} from "@/lib/profile-preferences";

const selectedProfile = profiles[0];

function formatIntentLabel(intent: string) {
  return intent
    .split("_")
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .join(" ");
}

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function ProfilePage() {
  const interestedEvents = selectedProfile.interested_event_ids
    .map((eventId) => events.find((event) => event.id === eventId))
    .filter((event): event is (typeof events)[number] => Boolean(event));

  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="A lightweight profile built around real plans: teams, timing, and budget."
      />

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-xl font-semibold text-zinc-700"
            aria-label="Profile image placeholder"
          >
            {selectedProfile.first_name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              {selectedProfile.first_name}, {selectedProfile.age}
            </h2>
            <p className="text-sm text-zinc-600">{selectedProfile.city}</p>
          </div>
        </div>
      </section>

      <ProfilePreferenceBlock
        title="Favorite teams & leagues"
        description="Signals that help match you with the right event crowd."
      >
        <ul className="space-y-2 text-sm text-zinc-700">
          <li>
            <span className="font-medium text-zinc-900">Teams:</span>{" "}
            {selectedProfile.favorite_teams.join(", ")}
          </li>
          <li>
            <span className="font-medium text-zinc-900">Leagues:</span>{" "}
            {profileFavoriteLeagues.join(", ")}
          </li>
        </ul>
      </ProfilePreferenceBlock>

      <ProfilePreferenceBlock
        title="Date preferences"
        description="Planning style and relationship intent for event-first dates."
      >
        <ul className="space-y-2 text-sm text-zinc-700">
          {profileDatePreferences.map((preference) => (
            <li key={preference}>• {preference}</li>
          ))}
          <li>
            • Looking for: <span className="font-medium">{formatIntentLabel(selectedProfile.intent)}</span>
          </li>
        </ul>
      </ProfilePreferenceBlock>

      <ProfilePreferenceBlock
        title="Ticket budget"
        description="Set a clear per-ticket range so invites stay realistic."
      >
        <p className="text-sm text-zinc-700">
          Up to <span className="font-semibold text-zinc-900">${selectedProfile.ticket_budget}</span> per ticket
        </p>
      </ProfilePreferenceBlock>

      <ProfilePreferenceBlock
        title="Upcoming interested events"
        description="Events you would actively plan a date around."
      >
        <ul className="space-y-3">
          {interestedEvents.map((event) => (
            <li key={event.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-sm font-semibold text-zinc-900">{event.title}</p>
              <p className="text-xs text-zinc-600">
                {formatEventDate(event.date)} • {event.time} • {event.venue}
              </p>
            </li>
          ))}
        </ul>
      </ProfilePreferenceBlock>
    </>
  );
}
