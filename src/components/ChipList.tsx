type ChipListProps = {
  items: string[];
};

export function ChipList({ items }: ChipListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="app-pill py-1.5 text-xs font-medium tracking-wide"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
