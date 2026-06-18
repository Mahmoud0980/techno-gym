"use client";

import { GridIcon, MoonIcon, SignOutIcon, TipJarIcon } from "@/components/icons/Icons";

export default function IconRail() {
  return (
    <aside className="app-panel sticky top-6 hidden h-[calc(100vh-3rem)] overflow-hidden rounded-2xl px-2 py-4 lg:flex lg:flex-col lg:items-center">
      <div className="mt-[300px] flex flex-1 flex-col items-center gap-10">
        <button className="grid size-11 place-items-center rounded-lg text-[#dadada] hover:bg-white/5" type="button">
          <GridIcon className="size-6" />
        </button>
        <button className="relative grid size-11 place-items-center rounded-lg bg-app-yellow/20 text-app-yellow yellow-glow" type="button">
          <TipJarIcon className="size-6" />
          <span className="absolute -start-3 top-1/2 h-9 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-app-yellow via-app-yellow/25 to-transparent" />
        </button>
      </div>

      <div className="mb-5 grid h-[102px] w-[54px] place-items-center gap-3 rounded-lg border border-[#2e2e2e] text-[#dadada]">
        <MoonIcon className="size-6" />
        <SignOutIcon className="size-6" />
      </div>
    </aside>
  );
}
