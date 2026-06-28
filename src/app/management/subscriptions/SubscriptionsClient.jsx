"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import Dropdown from "@/components/ui/Dropdown";
import Drawer from "@/components/ui/Drawer";
import SkeletonPage from "@/components/ui/Skeleton";
import StatsGrid from "@/components/ui/StatsGrid";
import { FilterIcon, SearchIcon } from "@/components/icons/Icons";
import { useSubscriptions } from "./useSubscriptions";

const statusLabels = {
  active: "نشط",
  expired: "منتهي",
  cancelled: "ملغي",
  frozen: "مجمّد",
  pending: "قيد الانتظار",
};

const statusClasses = {
  active: "status-success",
  expired: "status-danger",
  cancelled: "status-danger",
  frozen: "status-warning",
  pending: "status-review",
};

const statusOptions = [
  { value: "all", label: "كل الحالات" },
  { value: "active", label: "نشط" },
  { value: "expired", label: "منتهي" },
  { value: "frozen", label: "مجمّد" },
  { value: "cancelled", label: "ملغي" },
  { value: "pending", label: "قيد الانتظار" },
];

const CURRENCY_SYMBOL = "$";
const TABLE_GRID_COLUMNS =
  "minmax(180px,1.25fr) minmax(180px,1.1fr) 88px 128px 88px 88px 88px";

function parseAmount(value) {
  const number = Number.parseFloat(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value) {
  return `${CURRENCY_SYMBOL}${parseAmount(value).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex min-w-20 justify-center rounded-md px-3 py-1 text-xs font-medium ${
        statusClasses[status] || "bg-white/10 text-app-muted-light"
      }`}
    >
      {statusLabels[status] || status || "-"}
    </span>
  );
}

function DetailItem({ label, value, tone = "default" }) {
  const toneClass =
    tone === "green"
      ? "text-app-green"
      : tone === "red"
        ? "text-app-red"
        : tone === "yellow"
          ? "text-app-yellow"
          : "text-app-text";

  return (
    <div className="rounded-lg border border-app-line bg-app-card-soft/70 p-3 text-right">
      <p className="text-[11px] text-app-muted-light">{label}</p>
      <p className={`mt-1 truncate text-sm font-medium ${toneClass}`}>
        {value || "-"}
      </p>
    </div>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-medium text-app-yellow">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function SubscriptionDetails({
  subscription,
  error,
  isLoading,
  onRetry,
}) {
  if (isLoading) {
    return (
      <SkeletonPage
        blocks={[{ type: "details", sections: 4, itemsPerSection: 4 }]}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message="تعذر تحميل تفاصيل الاشتراك المحدد."
        onRetry={onRetry}
      />
    );
  }

  if (!subscription) {
    return (
      <div className="rounded-xl border border-app-line bg-app-card-soft/60 p-6 text-center text-sm text-app-muted-light">
        لا توجد تفاصيل لهذا الاشتراك.
      </div>
    );
  }

  const member = subscription.member || {};
  const person = member.person || {};
  const plan = subscription.plan || {};
  const planName = plan.name?.ar || plan.name?.en || "-";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-app-line bg-app-card-soft/70 p-4 text-right">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-medium text-app-text">
              {person.full_name || "-"}
            </h3>
            <p className="mt-1 text-xs text-app-muted-light" dir="ltr">
              {member.member_number || "-"}
            </p>
          </div>
          <StatusBadge status={subscription.status} />
        </div>
      </div>

      <DetailSection title="بيانات العضو">
        <DetailItem label="الاسم" value={person.full_name} />
        <DetailItem label="رقم العضوية" value={member.member_number} />
        <DetailItem label="البريد الإلكتروني" value={person.email} />
        <DetailItem label="الهاتف" value={person.phone} />
      </DetailSection>

      <DetailSection title="الخطة والمدة">
        <DetailItem label="الخطة" value={planName} />
        <DetailItem label="نوع الخطة" value={plan.type} />
        <DetailItem label="تاريخ البداية" value={formatDate(subscription.start_date)} />
        <DetailItem label="تاريخ النهاية" value={formatDate(subscription.end_date)} />
        <DetailItem label="عدد الجلسات" value={plan.session_count} />
        <DetailItem
          label="الجلسات المتبقية"
          value={subscription.remaining_sessions}
          tone="yellow"
        />
      </DetailSection>

      <DetailSection title="المدفوعات">
        <DetailItem
          label="إجمالي الاشتراك"
          value={formatMoney(subscription.total_amount)}
          tone="yellow"
        />
        <DetailItem
          label="المدفوع"
          value={formatMoney(subscription.paid_amount)}
          tone="green"
        />
        <DetailItem
          label="المتبقي"
          value={formatMoney(subscription.remaining_amount)}
          tone={parseAmount(subscription.remaining_amount) > 0 ? "red" : "green"}
        />
        <DetailItem label="المدرب" value={subscription.coach_id} />
      </DetailSection>

      <DetailSection title="ملاحظات وسجل">
        <DetailItem label="الملاحظات" value={subscription.notes} />
        <DetailItem
          label="التجميدات"
          value={`${subscription.freezes?.length || 0}`}
        />
        <DetailItem label="العناصر" value={`${subscription.items?.length || 0}`} />
      </DetailSection>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-app-red/30 bg-app-red/10 p-5 text-right">
      <h3 className="text-sm font-medium text-app-red">
        تعذر تحميل الاشتراكات
      </h3>
      <p className="mt-2 text-xs text-app-muted-light">
        {message || "تحقق من الاتصال أو صلاحية التوكن ثم أعد المحاولة."}
      </p>
      <Button tone="danger" className="mt-4 h-9 px-3 text-xs" onClick={onRetry}>
        إعادة المحاولة
      </Button>
    </div>
  );
}

export default function SubscriptionsClient() {
  const {
    search,
    setSearch,
    status,
    setStatus,
    selectedSubscriptionId,
    setSelectedSubscriptionId,
    error,
    isFetching,
    isLoading,
    refetch,
    subscriptionDetailError,
    isSubscriptionDetailFetching,
    isSubscriptionDetailLoading,
    refetchSubscriptionDetail,
    selectedSubscription,
    filteredSubscriptions,
    stats,
    errorMessage,
  } = useSubscriptions();

  const subscriptionColumns = useMemo(
    () => [
      {
        key: "member",
        label: "العضو",
        align: "center",
        render: (_, subscription) => {
          const member = subscription.member || {};
          const person = member.person || {};

          return (
            <div className="min-w-0 text-center">
              <p className="truncate text-sm font-medium text-app-text">
                {person.full_name || "-"}
              </p>
              <p
                className="mt-1 truncate text-[11px] text-app-muted-light"
                dir="ltr"
              >
                {member.member_number || "-"} · {person.phone || "-"}
              </p>
            </div>
          );
        },
      },
      {
        key: "plan",
        label: "الخطة",
        align: "center",
        render: (_, subscription) => {
          const plan = subscription.plan || {};
          const planName = plan.name?.ar || plan.name?.en || "-";

          return (
            <div className="min-w-0 text-center">
              <p className="truncate font-medium text-app-text">{planName}</p>
              <p className="mt-1 truncate text-[11px] text-app-muted-light">
                {plan.duration_days || 0} يوم · {plan.session_count || 0} جلسة
              </p>
            </div>
          );
        },
      },
      {
        key: "status",
        label: "الحالة",
        align: "center",
        render: (value) => <StatusBadge status={value} />,
      },
      {
        key: "period",
        label: "الفترة",
        align: "center",
        render: (_, subscription) => (
          <div className="text-center text-app-muted-light">
            <p>{formatDate(subscription.start_date)}</p>
            <p className="mt-1">{formatDate(subscription.end_date)}</p>
          </div>
        ),
      },
      {
        key: "remaining_sessions",
        label: "الجلسات",
        align: "center",
        render: (value) => (
          <div className="text-center">
            <span className="font-medium text-app-yellow">
              {(value ?? 0).toLocaleString("ar")}
            </span>
            <span className="text-app-muted-light"> متبقية</span>
          </div>
        ),
      },
      {
        key: "paid_amount",
        label: "المدفوع",
        align: "center",
        render: (value) => (
          <span className="font-medium text-app-green">{formatMoney(value)}</span>
        ),
      },
      {
        key: "remaining_amount",
        label: "المتبقي",
        align: "center",
        render: (value) => (
          <span className="font-medium text-app-red">{formatMoney(value)}</span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        eyebrow="إدارة النادي"
        title="اشتراكات الأعضاء"
        subtitle="متابعة خطط الأعضاء، حالة الاشتراك، الجلسات المتبقية، والمدفوعات."
        action={
          <Button
            tone="outline"
            className="h-10 px-4"
            onClick={refetch}
            disabled={isFetching}
          >
            {isFetching ? "جاري التحديث" : "تحديث البيانات"}
          </Button>
        }
      />

      <StatsGrid items={stats} />

      <DataTable
        title="قائمة اشتراكات الأعضاء"
        columns={subscriptionColumns}
        rows={filteredSubscriptions}
        minWidth="930px"
        tableColumns={TABLE_GRID_COLUMNS}
        showAdd={false}
        showSearch={false}
        showFilter={false}
        showExport={false}
        isLoading={isLoading}
        loadingRows={5}
        emptyMessage={
          error ? (
            <ErrorState message={errorMessage} onRetry={refetch} />
          ) : (
            "لا توجد اشتراكات مطابقة للبحث الحالي."
          )
        }
        rowClassName="gap-2 px-3 py-4"
        headerClassName="gap-2 px-3"
        onRowClick={(subscription) => setSelectedSubscriptionId(subscription.id)}
        getRowKey={(subscription) => subscription.id}
        totalPages={0}
        toolbarActions={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block min-w-64">
              <SearchIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-app-muted-light" />
              <input
                className="app-input h-10 w-full pr-9 pl-3 text-sm outline-none transition focus:border-app-yellow/70"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="بحث باسم العضو أو رقم العضوية"
                type="search"
              />
            </label>

            <Dropdown
              className="min-w-48"
              icon={FilterIcon}
              value={status}
              options={statusOptions}
              onChange={setStatus}
            />
          </div>
        }
        toolbarMeta={
          <p className="text-sm text-app-muted-light">
            النتائج:{" "}
            <span className="font-medium text-app-text">
              {filteredSubscriptions.length.toLocaleString("ar")}
            </span>
          </p>
        }
      />

      <Drawer
        open={Boolean(selectedSubscriptionId)}
        onClose={() => setSelectedSubscriptionId(null)}
        title="تفاصيل الاشتراك"
        subtitle={
          selectedSubscription?.member?.person?.full_name ||
          (selectedSubscriptionId ? `رقم الاشتراك ${selectedSubscriptionId}` : "")
        }
      >
        <SubscriptionDetails
          subscription={selectedSubscription}
          error={subscriptionDetailError}
          isLoading={isSubscriptionDetailLoading || isSubscriptionDetailFetching}
          onRetry={refetchSubscriptionDetail}
        />
      </Drawer>
    </div>
  );
}
