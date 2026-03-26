import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { getChatThreadById, starterChats } from "@/lib/mock-data";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chat = starterChats.find((entry) => entry.id === id);
  const thread = getChatThreadById(id);

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

  if (!thread || thread.messages.length === 0) {
    return (
      <>
        <PageHeader
          title={`Chat with ${chat.name}`}
          subtitle="Messaging is mocked for now while we scaffold the experience."
        />
        <EmptyState
          title="Chat thread not ready yet"
          description="This match exists, but its thread has not been initialized. Try another match preview."
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
        <p className="rounded-2xl bg-zinc-100 p-4 text-sm leading-6 text-zinc-700">{chat.teaser}</p>
      </SectionCard>
    </>
  );
}
