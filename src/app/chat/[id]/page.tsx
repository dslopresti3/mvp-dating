import { EmptyState } from "@/components/EmptyState";
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
    return (
      <>
        <PageHeader
          title="Chat"
          subtitle="Messaging is mocked for now while we scaffold the experience."
        />
        <EmptyState
          title="No chat found"
          description="That conversation does not exist yet. Start from your matches to open an available chat preview."
          actionHref="/matches"
          actionLabel="Back to matches"
        />
      </>
    );
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
        <p className="rounded-xl bg-zinc-100 p-3 text-sm leading-6 text-zinc-700">{chat.teaser}</p>
      </SectionCard>
    </>
  );
}
