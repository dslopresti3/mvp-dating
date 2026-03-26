'use client';

type IntentOption = {
  value: string;
  label: string;
  description: string;
};

type IntentSelectorProps = {
  title: string;
  options: IntentOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
};

export function IntentSelector({ title, options, selectedValue, onSelect }: IntentSelectorProps) {
  return (
    <section className="space-y-3.5" aria-label={title}>
      <div className="space-y-1">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-800">{title}</h2>
        <p className="text-sm text-zinc-600">Choose one so matching can prioritize the right people.</p>
      </div>
      <ul className="space-y-2.5">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => onSelect(option.value)}
                aria-pressed={isSelected}
                className={[
                  "w-full rounded-2xl border p-4 text-left transition-all duration-150",
                  isSelected
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_8px_20px_rgba(24,24,27,0.24)]"
                    : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-semibold tracking-tight">{option.label}</p>
                  <span
                    className={[
                      "inline-flex size-5 items-center justify-center rounded-full border text-[11px] font-bold",
                      isSelected ? "border-zinc-200 text-zinc-200" : "border-zinc-300 text-zinc-400",
                    ].join(" ")}
                    aria-hidden
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                </div>
                <p className={isSelected ? "mt-1 text-sm text-zinc-200" : "mt-1 text-sm text-zinc-600"}>
                  {option.description}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
