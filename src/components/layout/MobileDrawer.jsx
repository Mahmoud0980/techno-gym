"use client";

import { accountingMenu } from "@/data/mockData";
import { LogoMark } from "@/components/icons/Icons";
import Menu from "@/components/layout/Menu";
import { SunIcon, MoonIcon } from "@/components/icons/Icons";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function MobileDrawer({ open, onClose }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 w-72 max-w-[85vw] bg-[var(--app-panel)] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--app-line)] px-5 py-4">
            <button
              onClick={onClose}
              className="grid size-9 place-items-center rounded-lg hover:bg-white/10 text-[var(--app-muted)]"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-medium text-[var(--app-text)]">لوحة التحكم</h2>
              <LogoMark />
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="border-b border-[var(--app-line)] px-5 py-3">
            <button
              onClick={toggleTheme}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5 text-[var(--app-muted)]"
            >
              <div className="flex items-center gap-2">
                {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
              </div>
              <span>{theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}</span>
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin" onClick={onClose}>
            <p className="mb-4 px-4 text-right text-sm text-[var(--app-muted)]">القائمة</p>
            <Menu items={accountingMenu} />
          </nav>

          {/* Footer */}
          <div className="border-t border-[var(--app-line)] px-5 py-3 text-center text-xs text-[var(--app-muted)]">
            TechnoGYM v1.0
          </div>
        </div>
      </aside>
    </>
  );
}
