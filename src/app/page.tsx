import Link from "next/link";

import { ChipList } from "@/components/ChipList";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";

export default function HomePage() {
  const eventTypes = ["MLB", "NHL", "NBA", "WNBA", "MLS", "PWHL"];

  return (
    <>
      <PageHeader
        badge="Stadium Date"
        title="Pick the event first. Then meet someone to go with."
        subtitle="Stadium Date is event-first: choose a live game in your city, then discover people who want to attend that same event."
      />

      <SectionCard
        title="City"
        description="Start in your city so every event and match feels relevant."
      >
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">Choose city</span>
          <select
            defaultValue="new-york-city"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-sm"
          >
            <option value="new-york-city">New York City</option>
          </select>
        </label>
      </SectionCard>

      <SectionCard
        title="Event types"
        description="Pick a league to quickly tune your event feed."
      >
        <ChipList items={eventTypes} />
      </SectionCard>

      <SectionCard
        title="Ready to find your night out?"
        description="Go to the event feed and choose where your date starts."
      >
        <Link
          href="/discover"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Continue to Discover
        </Link>
      </SectionCard>
    </>
  );
}
