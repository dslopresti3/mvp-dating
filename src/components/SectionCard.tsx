import Link from "next/link";
import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  children?: ReactNode;
};

export function SectionCard({
  title,
  description,
  href,
  ctaLabel = "Open",
  children,
}: SectionCardProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">{title}</h2>
        {description ? <p className="text-sm text-zinc-600">{description}</p> : null}
      </div>
      {children}
      {href ? (
        <Link
          href={href}
          className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </section>
  );
}
