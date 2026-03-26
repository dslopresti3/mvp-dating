"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { bottomNavItems } from "@/lib/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-zinc-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2 backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-4 gap-2" role="list">
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
                className={`flex min-h-12 flex-col items-center justify-center rounded-xl px-2 text-xs font-semibold tracking-wide transition-colors ${
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
