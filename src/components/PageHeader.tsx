type PageHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: string;
};

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <header className="space-y-2">
      {badge ? (
        <p className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700">
          {badge}
        </p>
      ) : null}
      <div className="space-y-1.5">
        <h1 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-zinc-900">{title}</h1>
        {subtitle ? <p className="text-sm leading-6 text-zinc-600">{subtitle}</p> : null}
      </div>
    </header>
  );
}
