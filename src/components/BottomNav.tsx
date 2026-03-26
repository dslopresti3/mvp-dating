"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { bottomNavItems } from "@/lib/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-zinc-50/80 px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-4 gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_6px_24px_rgba(0,0,0,0.08)]" role="list">
        {bottomNavItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-12 flex-col items-center justify-center rounded-xl px-2 text-[11px] font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-zinc-300"}`} aria-hidden />
                <span className="mt-1">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
