import { ChatBubble } from "@/components/ChatBubble";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { getChatThreadById, getEventById, profiles, starterChats } from "@/lib/mock-data";

const quickActionItems = [
  {
    label: "Confirm meetup spot",
    detail: "Lock in a specific entrance and time before doors open.",
  },
  {
    label: "Align ticket budget",
    detail: "Set a target section and price range before buying.",
  },
  {
    label: "Share transit plan",
    detail: "Decide trains or rides so arrival stays stress-free.",
  },
] as const;

const formatMessageTime = (isoDate: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate));

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
          icon="💬"
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
          icon="🗂️"
        />
      </>
    );
  }

  const event = getEventById(thread.event_id);

  return (
    <>
      <PageHeader
        title={`Plan with ${chat.name}`}
        subtitle="Move this conversation toward a real event date. Messaging stays mocked for v1."
      />

      <section className="space-y-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="app-card !p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Date plan</p>
          <h2 className="mt-2 text-lg font-semibold text-zinc-900">{event?.title ?? "Upcoming event"}</h2>
          <p className="mt-1 text-sm text-zinc-600">
            {event ? `${event.date} • ${event.time} • ${event.venue}` : "Event details unavailable"}
          </p>
        </div>

        <div className="space-y-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-3">
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Thread</p>
          {thread.messages.map((message) => {
            const sender = profiles.find((profile) => profile.id === message.sender_profile_id);
            const senderName = sender?.first_name ?? "Match";
            const isCounterpart = senderName === chat.name;

            return (
              <ChatBubble
                key={message.id}
                senderName={senderName}
                sentAtLabel={formatMessageTime(message.sent_at)}
                text={message.text}
                isCounterpart={isCounterpart}
              />
            );
          })}
        </div>

        <div className="app-card !p-4">
          <h3 className="text-sm font-semibold text-zinc-900">Quick plan prompts</h3>
          <p className="mt-1 text-xs text-zinc-600">Tap a prompt to steer toward concrete game-day logistics.</p>
          <div className="mt-3 grid gap-2">
            {quickActionItems.map((action) => (
              <button
                key={action.label}
                type="button"
                className="app-choice-card bg-zinc-50 px-3 py-2"
                aria-label={`${action.label}. ${action.detail}`}
              >
                <p className="text-sm font-medium text-zinc-900">{action.label}</p>
                <p className="mt-0.5 text-xs text-zinc-600">{action.detail}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="app-card !p-3">
          <label htmlFor="message-draft" className="sr-only">
            Draft message
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id="message-draft"
              rows={2}
              placeholder="Suggest timing, entrance, or pre-game stop..."
              className="min-h-12 flex-1 resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-400 focus:bg-white focus:outline-none"
            />
            <button
              type="button"
              className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Demo only: sending is disabled until the real messaging backend ships.
          </p>
        </div>
      </section>
    </>
  );
}
