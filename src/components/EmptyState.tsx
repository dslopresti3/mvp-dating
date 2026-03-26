import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  icon?: string;
};

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel = "Go back",
  icon = "✨",
}: EmptyStateProps) {
  return (
    <section className="rounded-3xl border border-dashed border-zinc-300 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-xl">
        <span aria-hidden>{icon}</span>
      </div>
      <div className="mx-auto max-w-xs space-y-2">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">{title}</h2>
        <p className="text-sm leading-6 text-zinc-600">{description}</p>
      </div>

      {actionHref ? (
        <Link href={actionHref} className="app-button-primary mt-5">
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
