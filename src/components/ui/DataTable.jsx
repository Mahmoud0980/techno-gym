"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon, ChevronLeft, ChevronRight } from "@/components/icons/Icons";

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
    <div className="flex flex-col gap-3 border-b border-app-line px-3 py-3 sm:px-4 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-right">
        <h2 className="text-sm font-medium text-app-text sm:text-base">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-app-muted">{subtitle}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:order-first">
        {showAdd && <Button icon={<PlusIcon className="size-4" />} className="h-8 px-2 text-xs sm:h-9 sm:px-3">{addLabel}</Button>}
        <div className="flex h-8 min-w-0 flex-1 items-center justify-between rounded-lg bg-app-card-soft px-3 text-xs text-app-muted-light sm:h-9 sm:min-w-48 sm:flex-none">
          <SearchIcon className="size-4" />
          <span>البحث</span>
        </div>
        <Button tone="ghost" icon={<DownloadIcon className="size-4" />} className="h-8 px-2 text-xs sm:h-9 sm:px-3">تصدير</Button>
        <Button tone="ghost" icon={<FilterIcon className="size-4" />} className="h-8 px-2 text-xs sm:h-9 sm:px-3">تصفية</Button>
      </div>
    </div>
  );
}

/* ── Mobile Card View ── */
function MobileCard({ row, columns }) {
  // Find key columns for the card header
  const statusCol = columns.find((c) => c.type === "status");
  const moneyCol = columns.find((c) => c.type === "money" || c.type === "in" || c.type === "out");
  const otherCols = columns.filter((c) => c !== statusCol && c !== moneyCol);

  return (
    <div className="card-shell rounded-xl p-4">
      {/* Card Header: status badge + money value */}
      <div className="flex items-center justify-between gap-3">
        {statusCol && (
          <CellValue column={statusCol} value={row[statusCol.key]} />
        )}
        {moneyCol && (
          <span className="text-sm font-bold">
            <CellValue column={moneyCol} value={row[moneyCol.key]} />
          </span>
        )}
      </div>

      {/* Card Body: key-value pairs */}
      <div className="mt-3 space-y-2">
        {otherCols.map((col) => (
          <div key={col.key} className="flex items-center justify-between gap-2 text-xs">
            <span className="text-app-muted-light">{col.label}</span>
            <span className="font-medium text-app-text">
              <CellValue column={col} value={row[col.key]} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Pagination ── */
function Pagination({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 px-4 pb-4 pt-2 text-xs sm:gap-4" dir="ltr">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-app-muted-light transition hover:text-app-text disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">السابق</span>
      </button>

      <div className="flex items-center gap-1">
        {currentPage > 2 && (
          <>
            <button onClick={() => onPageChange(1)} className="grid size-8 place-items-center rounded-md text-app-muted-light hover:bg-app-card-soft hover:text-app-text">1</button>
            {currentPage > 3 && <span className="px-1 text-app-muted">…</span>}
          </>
        )}

        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`grid size-8 place-items-center rounded-md transition ${
              page === currentPage
                ? "bg-app-yellow text-black font-medium"
                : "text-app-muted-light hover:bg-app-card-soft hover:text-app-text"
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <span className="px-1 text-app-muted">…</span>}
            <button onClick={() => onPageChange(totalPages)} className="grid size-8 place-items-center rounded-md text-app-muted-light hover:bg-app-card-soft hover:text-app-text">{totalPages}</button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-app-yellow transition hover:text-app-yellow/80 disabled:opacity-30 disabled:pointer-events-none"
      >
        <span className="hidden sm:inline">التالي</span>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

/* ── Main DataTable ── */
const ROWS_PER_PAGE = 5;

export default function DataTable({ title, subtitle, columns, rows, addLabel, showAdd = true }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
  const startIdx = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedRows = rows.slice(startIdx, startIdx + ROWS_PER_PAGE);

  const tableColumns = columns.map((column) => column.width || "1fr").join(" ");

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="card-shell overflow-hidden rounded-2xl">
      <Toolbar title={title} subtitle={subtitle} addLabel={addLabel} showAdd={showAdd} />

      {/* ── Desktop: Grid Table (hidden on mobile) ── */}
      <div className="hidden overflow-x-auto scrollbar-thin px-4 pb-4 sm:block">
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
            {paginatedRows.map((row, index) => (
              <div
                key={`${row.id}-${index}`}
                className="grid items-center rounded-lg bg-app-card-soft/80 px-3 py-3 text-xs text-app-text transition hover:bg-app-card-soft"
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

      {/* ── Mobile: Cards (visible only on mobile) ── */}
      <div className="space-y-3 px-3 pb-3 pt-3 sm:hidden">
        {paginatedRows.map((row, index) => (
          <MobileCard key={`${row.id}-${index}`} row={row} columns={columns} />
        ))}
      </div>

      {/* ── Info + Pagination ── */}
      <div className="border-t border-app-line px-4 pt-3 text-center text-[11px] text-app-muted">
        عرض {startIdx + 1} – {Math.min(startIdx + ROWS_PER_PAGE, rows.length)} من {rows.length} سجل
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
}
