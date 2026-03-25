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
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        selected
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
