type FilterChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-150",
        selected
          ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_6px_16px_rgba(24,24,27,0.22)]"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
