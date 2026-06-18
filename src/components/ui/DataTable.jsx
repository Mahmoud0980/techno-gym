"use client";

import Button from "@/components/ui/Button";
import {
  DownloadIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons/Icons";
import { Field } from "@/components/forms/Field";

const statusClass = {
  مدفوع: "bg-[rgba(19,172,73,0.18)] text-app-green",
  معلق: "bg-[rgba(252,153,3,0.18)] text-[#d99300]",
  متأخر: "bg-[rgba(228,0,0,0.18)] text-app-red",
  "قيد المراجعة": "bg-[rgba(252,205,3,0.18)] text-app-yellow",
};

function getVisiblePages(page, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "...", total - 1, total];
  }

  if (page >= total - 2) {
    return [1, 2, "...", total - 3, total - 2, total - 1, total];
  }

  return [1, "...", page - 1, page, page + 1, "...", total];
}

function CellValue({ column, value }) {
  if (column.type === "status") {
    return (
      <span
        className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${statusClass[value] || "bg-white/10 text-app-muted-light"}`}
      >
        {value}
      </span>
    );
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

function Toolbar({
  title,
  subtitle,
  addLabel = "إضافة",
  showAdd = true,
  onAdd,
  searchValue,
  onSearchChange,
}) {
  return (
    <div
      className="flex flex-col gap-4 border-b border-app-line px-4 py-4 lg:flex-row lg:items-center lg:justify-between"
      dir="ltr"
    >
      <div className="text-end">
        <h2 className="text-base font-medium text-app-text">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-app-muted">{subtitle}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-3 lg:order-first">
        {showAdd && (
          <Button
            onClick={onAdd}
            icon={<PlusIcon className="size-4" />}
            className="h-9 px-3 text-xs"
          >
            {addLabel}
          </Button>
        )}{" "}
        <Field
          type="search"
          placeholder="البحث"
          icon={SearchIcon}
          className="min-w-48"
          dir="rtl"
          required={false}
          value={searchValue !== undefined ? searchValue : ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <Button
          tone="ghost"
          icon={<FilterIcon className="size-4" />}
          className="h-9 px-3 text-xs"
        >
          تصفية
        </Button>
        <Button
          tone="ghost"
          icon={<DownloadIcon className="size-4" />}
          className="h-9 px-3 text-xs"
        >
          تصدير
        </Button>
      </div>
    </div>
  );
}

export default function DataTable({
  title,
  subtitle,
  columns,
  rows,
  addLabel,
  showAdd = true,
  onAdd,
  searchValue,
  onSearchChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const tableColumns = columns.map((column) => column.width || "1fr").join(" ");
  const visiblePages =
    totalPages > 0 ? getVisiblePages(currentPage, totalPages) : [];

  return (
    <section className="app-card overflow-hidden rounded-2xl">
      <Toolbar
        title={title}
        subtitle={subtitle}
        addLabel={addLabel}
        showAdd={showAdd}
        onAdd={onAdd}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />

      <div className="overflow-x-auto scrollbar-thin px-4 pb-4">
        <div className="min-w-[780px]">
          <div
            className="grid border-b border-app-line px-3 py-3 text-xs text-app-muted-light"
            style={{ gridTemplateColumns: tableColumns }}
          >
            {columns.map((column) => (
              <div key={column.key} className="text-end">
                {column.label}
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-3">
            {rows.map((row, index) => (
              <div
                key={`${row.id || index}-${index}`}
                className="grid items-center rounded-lg bg-[rgba(34,34,34,0.78)] px-3 py-3 text-xs text-app-text transition hover:bg-[rgba(40,40,40,0.82)]"
                style={{ gridTemplateColumns: tableColumns }}
              >
                {columns.map((column) => (
                  <div key={column.key} className="text-end">
                    <CellValue column={column} value={row[column.key]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalPages > 0 && (
        <div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 px-4 pb-5 text-xs text-app-muted-light"
          dir="ltr"
        >
          <button
            className={`text-app-yellow transition-colors hover:text-app-yellow/80 ${
              currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              onPageChange &&
              currentPage < totalPages &&
              onPageChange(currentPage + 1)
            }
            disabled={currentPage >= totalPages}
          >
            التالي →
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {visiblePages.map((page, index) => (
              <span key={index}>
                {page === "..." ? (
                  <span className="px-1 py-1 sm:px-2">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange && onPageChange(page)}
                    className={`rounded-md px-2 py-1 transition-colors ${
                      currentPage === page
                        ? "bg-app-card-soft text-white"
                        : "hover:bg-[rgba(40,40,40,0.82)]"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </span>
            ))}
          </div>
          <button
            className={`hover:text-white transition-colors ${currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() =>
              onPageChange && currentPage > 1 && onPageChange(currentPage - 1)
            }
            disabled={currentPage <= 1}
          >
            ← السابق
          </button>
        </div>
      )}
    </section>
  );
}
