import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { starterChats } from "@/lib/mock-data";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chat = starterChats.find((entry) => entry.id === id);

  if (!chat) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={`Chat with ${chat.name}`}
        subtitle="Messaging is mocked for now while we scaffold the experience."
      />
      <SectionCard
        title="Conversation preview"
        description="A simple placeholder for the eventual real-time chat UI."
      >
        <p className="rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700">{chat.teaser}</p>
      </SectionCard>
    </>
  );
}
