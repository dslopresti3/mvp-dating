type AvatarPlaceholderProps = {
  name: string;
  sizeClassName?: string;
  textClassName?: string;
  shape?: "circle" | "rounded";
};

export function AvatarPlaceholder({
  name,
  sizeClassName = "h-14 w-14",
  textClassName = "text-lg",
  shape = "circle",
}: AvatarPlaceholderProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 font-semibold text-zinc-700 ${sizeClassName} ${textClassName} ${shape === "circle" ? "rounded-full" : "rounded-2xl"}`}
      aria-hidden
    >
      <span className="relative z-10">{initial}</span>
      <span className="absolute -bottom-3 -right-2 text-4xl text-zinc-300">●</span>
    </div>
  );
}
