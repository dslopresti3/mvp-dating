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
    <section className="app-card space-y-4">
      <div className="app-section-heading border-b border-zinc-100 pb-3">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">{title}</h2>
        {description ? <p className="text-sm leading-6 text-zinc-600">{description}</p> : null}
      </div>
      {children}
      {href ? (
        <Link href={href} className="app-button-primary">
          {ctaLabel}
        </Link>
      ) : null}
    </section>
  );
}
