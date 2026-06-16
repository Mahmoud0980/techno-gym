import Link from "next/link";
import { GridIcon, LogoMark } from "@/components/icons/Icons";

const railItems = [
  { href: "/accounting", label: "المحاسبة" },
  { href: "/reports", label: "التقارير" },
  { href: "#", label: "الإعدادات" },
];

export default function IconRail() {
  return (
    <aside className="panel-shell sticky top-4 hidden h-[calc(100vh-2rem)] flex-col items-center rounded-2xl px-2 py-4 lg:flex">
      <div className="grid h-8 w-full place-items-center overflow-hidden rounded-md">
        <LogoMark />
      </div>

      <div className="mt-24 flex w-full flex-col items-center gap-6">
        {railItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={`relative grid size-11 place-items-center rounded-lg text-app-muted-light transition hover:text-app-yellow ${
              index === 0 ? "bg-gradient-to-b from-[rgba(252,205,3,0.72)] to-[rgba(252,205,3,0)] text-white" : ""
            }`}
          >
            {index === 0 && <span className="absolute -left-3 top-1 h-9 w-[3px] rounded-full bg-gradient-to-b from-app-yellow to-transparent" />}
            <GridIcon className="size-5" />
          </Link>
        ))}
      </div>

      <div className="mt-auto grid w-14 gap-4 rounded-lg border border-[#2e2e2e] py-3 text-app-muted-light">
        <GridIcon className="mx-auto size-5" />
        <GridIcon className="mx-auto size-5" />
      </div>
    </aside>
  );
}
