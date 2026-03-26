type PageHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: string;
};

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <header className="space-y-3">
      {badge ? (
        <p className="inline-flex rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-700">
          {badge}
        </p>
      ) : null}
      <div className="space-y-2">
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-900">{title}</h1>
        {subtitle ? <p className="text-[15px] leading-6 text-zinc-600">{subtitle}</p> : null}
      </div>
    </header>
  );
}
