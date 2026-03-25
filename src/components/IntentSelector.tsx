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
    <section className="space-y-3" aria-label={title}>
      <h2 className="text-sm font-semibold tracking-wide text-zinc-800">{title}</h2>
      <ul className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => onSelect(option.value)}
                aria-pressed={isSelected}
                className={[
                  "w-full rounded-2xl border p-4 text-left transition-colors",
                  isSelected
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300",
                ].join(" ")}
              >
                <p className="text-base font-semibold tracking-tight">{option.label}</p>
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
