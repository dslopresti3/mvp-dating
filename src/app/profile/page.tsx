import { AvatarPlaceholder } from "@/components/AvatarPlaceholder";
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

      <section className="app-card space-y-4">
        <div className="flex items-start gap-4">
          <AvatarPlaceholder
            name={selectedProfile.first_name}
            sizeClassName="h-16 w-16"
            textClassName="text-xl"
            shape="rounded"
          />

          <div className="min-w-0 flex-1 space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              {selectedProfile.first_name}
            </h2>

            <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-700">
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1">
                {selectedProfile.city}
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1">
                {selectedProfile.age} years old
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1">
                {formatIntentLabel(selectedProfile.intent)}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm leading-6 text-zinc-600">{selectedProfile.bio}</p>
      </section>

      <ProfilePreferenceBlock
        title="Favorite teams & leagues"
        description="Sports context that helps pair you with the right event and crowd."
      >
        <div className="space-y-3">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Teams
            </p>
            <ul className="flex flex-wrap gap-2">
              {selectedProfile.favorite_teams.map((team) => (
                <li
                  key={team}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-800"
                >
                  {team}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Leagues
            </p>
            <ul className="flex flex-wrap gap-2">
              {profileFavoriteLeagues.map((league) => (
                <li
                  key={league}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700"
                >
                  {league}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ProfilePreferenceBlock>

      <ProfilePreferenceBlock
        title="Date planning preferences"
        description="Only the details that matter for choosing and committing to an event date."
      >
        <div className="grid grid-cols-1 gap-3">
          <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Ticket budget
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Up to <span className="font-semibold text-zinc-900">${selectedProfile.ticket_budget}</span> per ticket
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Preferred vibe
            </p>
            <p className="mt-1 text-sm font-medium capitalize text-zinc-900">{selectedProfile.preferred_vibe}</p>
          </article>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-3.5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
            Planning style
          </p>
          <ul className="space-y-1.5 text-sm text-zinc-700">
            {profileDatePreferences.map((preference) => (
              <li key={preference}>• {preference}</li>
            ))}
          </ul>
        </div>
      </ProfilePreferenceBlock>

      <ProfilePreferenceBlock
        title="Upcoming interested events"
        description="Events you are most likely to plan a real date around next."
      >
        <ul className="space-y-3">
          {interestedEvents.map((event) => (
            <li key={event.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-900">{event.title}</p>
                  <p className="text-xs text-zinc-600">
                    {formatEventDate(event.date)} • {event.time}
                  </p>
                  <p className="text-xs text-zinc-600">{event.venue}</p>
                </div>
                <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-700">
                  {event.league}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </ProfilePreferenceBlock>
    </>
  );
}
