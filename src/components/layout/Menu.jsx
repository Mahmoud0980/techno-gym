"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@/components/icons/Icons";

function isItemActive(pathname, href) {
  if (href === "/accounting") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Menu({ items = [] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3">
      {items.map((item) => {
        const active = isItemActive(pathname, item.href);
        const childActive = item.children?.some((child) => isItemActive(pathname, child.href));

        return (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`flex h-11 items-center justify-between rounded-lg px-4 text-sm transition ${
                active || childActive ? "gold-active" : "text-app-text hover:bg-white/5 hover:text-app-yellow"
              }`}
            >
              <ChevronRight className="size-4" />
              <span>{item.title}</span>
              <ChevronLeft className="size-4" />
            </Link>

            {item.children && (active || childActive) && (
              <div className="mr-6 mt-3 flex flex-col gap-2 border-r border-white/35 pr-4">
                {item.children.map((child) => {
                  const activeChild = isItemActive(pathname, child.href);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center gap-2 text-xs transition ${activeChild ? "text-app-yellow" : "text-app-text hover:text-app-yellow"}`}
                    >
                      <span className={`size-2 rounded-full border ${activeChild ? "border-app-yellow" : "border-white/70"}`} />
                      {child.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
