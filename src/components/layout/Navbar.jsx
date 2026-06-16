"use client";

import { usePathname } from "next/navigation";
import { pageMeta } from "@/data/mockData";
import { SearchIcon, SunIcon, MoonIcon } from "@/components/icons/Icons";
import { useTheme } from "@/components/providers/ThemeProvider";

function InfoChip({ children }) {
  return (
    <div className="panel-shell flex h-9 items-center gap-2 rounded-lg bg-app-panel-soft px-3 text-[11px] text-app-muted-light">
      <SearchIcon className="size-4" />
      {children}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const meta = pageMeta[pathname] || pageMeta["/accounting"];
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <header className="panel-shell flex h-16 items-center rounded-2xl px-4">
        <div className="hidden flex-1 items-center gap-14 text-app-muted-light md:flex">
          {/* <button onClick={toggleTheme} className="hover:text-app-yellow transition-colors" title="تبديل الوضع">
            {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          </button> */}
          <SearchIcon className="size-5" />
          <SearchIcon className="size-5" />
        </div>

        <div className="flex h-10 w-full items-center justify-between rounded-lg bg-[var(--app-line)] px-3 text-sm text-app-text md:w-[373px]">
          <SearchIcon className="size-5 text-app-muted-light" />
          <span>البحث</span>
        </div>
      </header>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <InfoChip>12:00 am</InfoChip>
          <InfoChip>الخميس 30 مايو 2026</InfoChip>
        </div>
        <div className="max-w-sm text-right">
          <h1 className="text-base font-medium text-app-text">{meta.title}</h1>
          <p className="mt-1 text-xs text-app-muted-light">{meta.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
