type FilterChipProps = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

export function FilterChip({ label, isSelected, onSelect }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={[
        "app-button-secondary-muted px-4 transition-all duration-150",
        isSelected
          ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_6px_16px_rgba(24,24,27,0.22)]"
          : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
