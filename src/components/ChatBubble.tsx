import { AvatarPlaceholder } from "@/components/AvatarPlaceholder";

type ChatBubbleProps = {
  senderName: string;
  sentAtLabel: string;
  text: string;
  isCounterpart: boolean;
};

export function ChatBubble({ senderName, sentAtLabel, text, isCounterpart }: ChatBubbleProps) {
  return (
    <div className={`flex items-end gap-2 ${isCounterpart ? "justify-start" : "justify-end"}`}>
      {isCounterpart ? <AvatarPlaceholder name={senderName} sizeClassName="h-9 w-9" textClassName="text-sm" /> : null}
      <article
        className={`max-w-[82%] space-y-1 rounded-2xl p-3 ${
          isCounterpart
            ? "mr-auto bg-white text-zinc-900 shadow-sm"
            : "ml-auto bg-zinc-900 text-white"
        }`}
      >
        <div className="flex items-center justify-between gap-3 text-[11px]">
          <span className={`font-medium ${isCounterpart ? "text-zinc-500" : "text-zinc-300"}`}>
            {senderName}
          </span>
          <time className={isCounterpart ? "text-zinc-400" : "text-zinc-300"}>{sentAtLabel}</time>
        </div>
        <p className="text-sm leading-6">{text}</p>
      </article>
      {!isCounterpart ? <AvatarPlaceholder name="You" sizeClassName="h-9 w-9" textClassName="text-sm" /> : null}
    </div>
  );
}
