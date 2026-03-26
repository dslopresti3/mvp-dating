import { formatKebabLabel } from "@/lib/formatting";

type EventQuickFactsProps = {
  ticketPrice: number;
  vibe: string;
  venue: string;
  area: string;
};

type FactCardProps = {
  label: string;
  value: string;
  helper?: string;
  emphasized?: boolean;
};

function FactCard({ label, value, helper, emphasized = false }: FactCardProps) {
  return (
    <article
      className={[
        "rounded-2xl border p-3.5",
        emphasized
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-zinc-50 text-zinc-900",
      ].join(" ")}
    >
      <p className={emphasized ? "text-[11px] uppercase tracking-[0.08em] text-zinc-300" : "text-[11px] uppercase tracking-[0.08em] text-zinc-500"}>
        {label}
      </p>
      <p className="mt-1 text-base font-semibold tracking-tight">{value}</p>
      {helper ? (
        <p className={emphasized ? "mt-1 text-xs text-zinc-300" : "mt-1 text-xs text-zinc-500"}>{helper}</p>
      ) : null}
    </article>
  );
}

export function EventQuickFacts({ ticketPrice, vibe, venue, area }: EventQuickFactsProps) {
  return (
    <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-3" aria-label="Event quick facts">
      <FactCard
        label="Avg ticket"
        value={`$${ticketPrice}`}
        helper="Per seat right now"
        emphasized
      />
      <FactCard label="Vibe" value={formatKebabLabel(vibe)} helper="Crowd energy" />
      <FactCard label="Venue" value={venue} helper={area} />
    </section>
  );
}
