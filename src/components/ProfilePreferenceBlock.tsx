import type { ReactNode } from "react";

type ProfilePreferenceBlockProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ProfilePreferenceBlock({
  title,
  description,
  children,
}: ProfilePreferenceBlockProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">{title}</h2>
        {description ? <p className="text-sm text-zinc-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
