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

export default function Navbar({ onMenuClick }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] || pageMeta["/accounting"];
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <header className="panel-shell flex h-14 items-center rounded-2xl px-3 sm:h-16 sm:px-4">
        {/* Mobile: Hamburger + Theme Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onMenuClick}
            className="grid size-9 place-items-center rounded-lg text-app-muted-light hover:text-app-yellow transition-colors"
            aria-label="فتح القائمة"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={toggleTheme}
            className="grid size-9 place-items-center rounded-lg text-app-muted-light hover:text-app-yellow transition-colors"
            aria-label="تبديل الوضع"
          >
            {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          </button>
        </div>

        {/* Desktop: Left side icons */}
        <div className="hidden flex-1 items-center gap-14 text-app-muted-light lg:flex">
          <button onClick={toggleTheme} className="hover:text-app-yellow transition-colors" title="تبديل الوضع">
            {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          </button>
          <SearchIcon className="size-5" />
          <SearchIcon className="size-5" />
        </div>

        {/* Search bar */}
        <div className="mr-auto flex h-10 w-full items-center justify-between rounded-lg bg-[var(--app-line)] px-3 text-sm text-app-text sm:w-auto sm:min-w-[200px] md:w-[373px] lg:mr-0">
          <SearchIcon className="size-5 text-app-muted-light" />
          <span>البحث</span>
        </div>
      </header>

      {/* Title + Date/Time row */}
      <div className="mt-3 flex flex-col-reverse items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <InfoChip>12:00 am</InfoChip>
          <InfoChip>الخميس 30 مايو 2026</InfoChip>
        </div>
        <div className="max-w-sm text-right">
          <h1 className="text-sm font-medium text-app-text sm:text-base">{meta.title}</h1>
          <p className="mt-1 text-xs text-app-muted-light">{meta.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
