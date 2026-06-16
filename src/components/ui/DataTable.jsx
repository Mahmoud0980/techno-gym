import Button from "@/components/ui/Button";
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from "@/components/icons/Icons";

const statusClass = {
  مدفوع: "bg-[rgba(19,172,73,0.18)] text-app-green",
  معلق: "bg-[rgba(252,153,3,0.18)] text-[#d99300]",
  متأخر: "bg-[rgba(228,0,0,0.18)] text-app-red",
  "قيد المراجعة": "bg-[rgba(252,205,3,0.18)] text-app-yellow",
};

function CellValue({ column, value }) {
  if (column.type === "status") {
    return <span className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${statusClass[value] || "bg-white/10 text-app-muted-light"}`}>{value}</span>;
  }

  if (column.type === "money") {
    return <span className="font-medium text-app-yellow">{value}</span>;
  }

  if (column.type === "in") {
    return <span className="font-medium text-app-green">{value}</span>;
  }

  if (column.type === "out") {
    return <span className="font-medium text-app-red">{value}</span>;
  }

  if (column.type === "warning") {
    return <span className="font-medium text-[#d99300]">{value}</span>;
  }

  return <span>{value}</span>;
}

function Toolbar({ title, subtitle, addLabel = "إضافة", showAdd = true }) {
  return (
    <div className="flex flex-col gap-4 border-b border-app-line px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-right">
        <h2 className="text-base font-medium text-app-text">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-app-muted">{subtitle}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-3 lg:order-first">
        {showAdd && <Button icon={<PlusIcon className="size-4" />} className="h-9 px-3 text-xs">{addLabel}</Button>}
        <div className="flex h-9 min-w-48 items-center justify-between rounded-lg bg-app-card-soft px-3 text-xs text-app-muted-light">
          <SearchIcon className="size-4" />
          <span>البحث</span>
        </div>
        <Button tone="ghost" icon={<DownloadIcon className="size-4" />} className="h-9 px-3 text-xs">تصدير</Button>
        <Button tone="ghost" icon={<FilterIcon className="size-4" />} className="h-9 px-3 text-xs">تصفية</Button>
      </div>
    </div>
  );
}

export default function DataTable({ title, subtitle, columns, rows, addLabel, showAdd = true }) {
  const tableColumns = columns.map((column) => column.width || "1fr").join(" ");

  return (
    <section className="card-shell overflow-hidden rounded-2xl">
      <Toolbar title={title} subtitle={subtitle} addLabel={addLabel} showAdd={showAdd} />

      <div className="overflow-x-auto scrollbar-thin px-4 pb-4">
        <div className="min-w-[780px]">
          <div
            className="grid border-b border-app-line px-3 py-3 text-xs text-app-muted-light"
            style={{ gridTemplateColumns: tableColumns }}
          >
            {columns.map((column) => (
              <div key={column.key} className="text-right">
                {column.label}
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-3">
            {rows.map((row, index) => (
              <div
                key={`${row.id}-${index}`}
                className="grid items-center rounded-lg bg-[rgba(34,34,34,0.78)] px-3 py-3 text-xs text-app-text"
                style={{ gridTemplateColumns: tableColumns }}
              >
                {columns.map((column) => (
                  <div key={column.key} className="text-right">
                    <CellValue column={column} value={row[column.key]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 px-4 pb-5 text-xs text-app-muted-light" dir="ltr">
        <button className="hover:text-white">← Previous</button>
        <span className="rounded-md bg-app-card-soft px-2 py-1 text-white">1</span>
        <span>2</span>
        <span>3</span>
        <span>...</span>
        <span>67</span>
        <span>68</span>
        <button className="text-app-yellow hover:text-app-yellow/80">Next →</button>
      </div>
    </section>
  );
}
