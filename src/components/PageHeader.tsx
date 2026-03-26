type PageHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: string;
};

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <header className="space-y-3">
      {badge ? <p className="app-pill">{badge}</p> : null}
      <div className="app-section-heading">
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-900 [overflow-wrap:anywhere]">
          {title}
        </h1>
        {subtitle ? <p className="text-[15px] leading-6 text-zinc-600">{subtitle}</p> : null}
      </div>
    </header>
  );
}
