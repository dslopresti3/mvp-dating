type ChipListProps = {
  items: string[];
};

export function ChipList({ items }: ChipListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
