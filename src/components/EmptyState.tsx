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
    <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-center shadow-sm">
      <div className="mx-auto max-w-xs space-y-2">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">{title}</h2>
        <p className="text-sm leading-6 text-zinc-600">{description}</p>
      </div>

      {actionHref ? (
        <Link
          href={actionHref}
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
        >
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
