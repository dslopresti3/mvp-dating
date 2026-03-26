type EventThumbnailProps = {
  league: string;
  title: string;
  venue: string;
};

const leagueAccentMap: Record<string, { icon: string; accent: string }> = {
  NBA: { icon: "🏀", accent: "from-orange-50 to-amber-100" },
  WNBA: { icon: "🏀", accent: "from-orange-50 to-rose-100" },
  NHL: { icon: "🏒", accent: "from-sky-50 to-cyan-100" },
  MLB: { icon: "⚾", accent: "from-zinc-50 to-slate-100" },
  MLS: { icon: "⚽", accent: "from-emerald-50 to-teal-100" },
  PWHL: { icon: "🥅", accent: "from-violet-50 to-fuchsia-100" },
};

export function EventThumbnail({ league, title, venue }: EventThumbnailProps) {
  const leagueAccent = leagueAccentMap[league] ?? {
    icon: "🎟️",
    accent: "from-zinc-50 to-zinc-100",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br ${leagueAccent.accent} p-3.5`}
      aria-hidden
    >
      <div className="absolute -right-4 -top-6 text-6xl opacity-15">{leagueAccent.icon}</div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">{league}</p>
      <p className="mt-1 truncate text-sm font-semibold text-zinc-900">{title}</p>
      <p className="mt-1 truncate text-xs text-zinc-600">{venue}</p>
    </div>
  );
}
