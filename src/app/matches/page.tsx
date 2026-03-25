import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { starterChats, starterMatches } from "@/lib/mock-data";

export default function MatchesPage() {
  return (
    <>
      <PageHeader
        title="Your matches"
        subtitle="People who align with your event plans and energy."
      />
      <div className="space-y-4">
        {starterMatches.map((match) => {
          const chat = starterChats.find((entry) => entry.matchId === match.id);

          return (
            <SectionCard key={match.id} title={match.name} description={match.vibe}>
              {chat ? (
                <Link
                  href={`/chat/${chat.id}`}
                  className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                >
                  Open chat
                </Link>
              ) : (
                <p className="text-sm text-zinc-600">Chat will unlock after your first event check-in.</p>
              )}
            </SectionCard>
          );
        })}
      </div>
    </>
  );
}
