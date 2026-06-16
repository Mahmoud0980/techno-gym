import { accountingMenu } from "@/data/mockData";
import { LogoMark } from "@/components/icons/Icons";
import Menu from "@/components/layout/Menu";

export default function Sidebar() {
  return (
    <aside className="panel-shell sticky top-4 hidden h-[calc(100vh-2rem)] overflow-hidden rounded-2xl lg:block">
      <div className="flex items-start justify-between gap-4 px-5 pt-5">
        <div className="text-right">
          <h2 className="text-lg font-medium text-white">لوحة التحكم</h2>
          <div className="mt-5 flex gap-3">
            <span className="size-9 rounded-full border border-app-yellow/40 bg-[rgba(252,205,3,0.16)]" />
            <span className="size-9 rounded-full border border-white/15 bg-white/10" />
          </div>
        </div>
        <div className="rounded-lg bg-black/20 p-1">
          <LogoMark />
        </div>
      </div>

      <div className="mt-10 px-1">
        <p className="mb-7 px-5 text-right text-sm text-app-text">لوحة التحكم</p>
        <Menu items={accountingMenu} />
      </div>
    </aside>
  );
}
