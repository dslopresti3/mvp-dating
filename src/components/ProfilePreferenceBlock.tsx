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
    <section className="app-card space-y-3">
      <div className="space-y-1.5">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">{title}</h2>
        {description ? <p className="text-sm leading-6 text-zinc-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
