import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { featuredEvents } from "@/lib/mock-data";

export default function HomePage() {
  const nextEvent = featuredEvents[0];

  return (
    <>
      <PageHeader
        badge="Stadium Date"
        title="Pick an event, then find your people"
        subtitle="Start with the game night. Matching comes second."
      />

      <SectionCard
        title="Tonight's featured event"
        description={`${nextEvent.title} • ${nextEvent.venue}`}
        href={`/events/${nextEvent.id}`}
        ctaLabel="View event"
      >
        <p className="text-sm text-zinc-700">{nextEvent.date}</p>
      </SectionCard>

      <SectionCard
        title="Quick actions"
        description="Jump into your core flows while we build out the full experience."
      >
        <div className="flex flex-wrap gap-2">
          <Link href="/discover" className="rounded-full bg-zinc-100 px-4 py-2 text-sm">
            Discover events
          </Link>
          <Link href="/matches" className="rounded-full bg-zinc-100 px-4 py-2 text-sm">
            See matches
          </Link>
          <Link href="/profile" className="rounded-full bg-zinc-100 px-4 py-2 text-sm">
            Edit profile
          </Link>
        </div>
      </SectionCard>
    </>
  );
}
