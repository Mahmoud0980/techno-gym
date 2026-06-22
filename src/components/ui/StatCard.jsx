import { GridIcon, TrendUpIcon } from "@/components/icons/Icons";

const toneMap = {
  yellow: {
    icon: "bg-[rgba(252,205,3,0.22)] text-app-yellow",
    spark: "border-app-yellow",
  },
  green: {
    icon: "bg-[rgba(19,172,73,0.22)] text-app-green",
    spark: "border-app-green",
  },
  blue: {
    icon: "bg-[rgba(7,85,255,0.22)] text-app-blue",
    spark: "border-app-blue",
  },
  purple: {
    icon: "bg-[rgba(121,37,255,0.22)] text-app-purple",
    spark: "border-app-purple",
  },
};

function MiniSpark({ tone = "yellow" }) {
  const color = toneMap[tone]?.spark || toneMap.yellow.spark;

  return (
    <div className={`relative h-7 w-16 overflow-hidden border-b-2 ${color}`}>
      <span className="absolute bottom-1 start-0 h-4 w-4 rotate-45 border-t-2 border-current text-inherit opacity-70" />
      <span className="absolute bottom-2 start-4 h-5 w-5 rotate-45 border-t-2 border-current text-inherit opacity-90" />
      <span className="absolute bottom-1 start-9 h-4 w-5 rotate-45 border-t-2 border-current text-inherit opacity-80" />
    </div>
  );
}

export default function StatCard({
  title,
  value,
  change,
  helper,
  tone = "yellow",
  negative = false,
  compact = false,
}) {
  const styles = toneMap[tone] || toneMap.yellow;

  return (
    <article className="card-shell min-h-32 overflow-hidden rounded-2xl p-4" dir="rtl">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 text-right">
          <h3 className="truncate text-sm font-medium text-app-text">
            {title}
          </h3>
          {helper && compact && (
            <p className="mt-1 text-xs text-app-muted">{helper}</p>
          )}
        </div>
        <div
          className={`grid size-11 shrink-0 place-items-center rounded-full ${styles.icon}`}
        >
          <GridIcon className="size-5" />
        </div>
      </div>

      {!compact && (
        <div className="mt-2 text-center text-xl font-medium text-white">
          {value}
        </div>
      )}
      {compact && value && (
        <div className="mt-5 text-center text-xl font-medium text-white">
          {value}
        </div>
      )}

      {!compact && (
        <div
          className={`mt-2 flex items-end justify-between ${tone === "yellow" ? "text-app-yellow" : tone === "green" ? "text-app-green" : tone === "purple" ? "text-app-purple" : "text-app-blue"}`}
        >
          <MiniSpark tone={tone} />
          <div className="text-right text-[11px] text-white">
            {change && (
              <div
                className={`flex items-center justify-end gap-1 text-sm font-medium ${negative ? "text-app-red" : "text-app-green-2"}`}
              >
                <TrendUpIcon
                  className={`size-4 ${negative ? "rotate-180" : ""}`}
                />
                <span>{change}</span>
              </div>
            )}
            {helper && <span>{helper}</span>}
          </div>
        </div>
      )}
    </article>
  );
}
