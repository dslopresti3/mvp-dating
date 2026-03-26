import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel = "Go back",
}: EmptyStateProps) {
  return (
    <section className="rounded-3xl border border-dashed border-zinc-300 bg-white p-6 text-center shadow-sm">
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
