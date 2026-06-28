import { useMemo, useState } from "react";
import {
  useGetPlayerSubscriptionQuery,
  useGetPlayerSubscriptionsQuery,
} from "@/lib/api/playerSubscriptionsApi";

function parseAmount(value) {
  const number = Number.parseFloat(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value) {
  return `$${parseAmount(value).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function getSubscriptionRows(response) {
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

function getSubscriptionDetail(response) {
  return response?.data || null;
}

export function useSubscriptions() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);

  const { data, error, isFetching, isLoading, refetch } =
    useGetPlayerSubscriptionsQuery();
  const {
    data: subscriptionDetailData,
    error: subscriptionDetailError,
    isFetching: isSubscriptionDetailFetching,
    isLoading: isSubscriptionDetailLoading,
    refetch: refetchSubscriptionDetail,
  } = useGetPlayerSubscriptionQuery(selectedSubscriptionId, {
    skip: !selectedSubscriptionId,
  });

  const subscriptions = useMemo(() => getSubscriptionRows(data), [data]);
  const selectedSubscription = useMemo(
    () => getSubscriptionDetail(subscriptionDetailData),
    [subscriptionDetailData],
  );

  const filteredSubscriptions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return subscriptions.filter((subscription) => {
      const member = subscription.member || {};
      const person = member.person || {};
      const plan = subscription.plan || {};
      const planName = plan.name?.ar || plan.name?.en || "";
      const matchesStatus = status === "all" || subscription.status === status;
      const matchesSearch =
        !normalizedSearch ||
        [
          person.full_name,
          person.email,
          person.phone,
          member.member_number,
          planName,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedSearch),
          );

      return matchesStatus && matchesSearch;
    });
  }, [search, status, subscriptions]);

  const stats = useMemo(() => {
    const activeCount = subscriptions.filter(
      (item) => item.status === "active",
    ).length;
    const totalPaid = subscriptions.reduce(
      (sum, item) => sum + parseAmount(item.paid_amount),
      0,
    );
    const totalRemaining = subscriptions.reduce(
      (sum, item) => sum + parseAmount(item.remaining_amount),
      0,
    );
    const today = new Date();
    const soon = subscriptions.filter((item) => {
      const endDate = new Date(item.end_date);
      if (Number.isNaN(endDate.getTime())) return false;
      const diffDays = (endDate - today) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    }).length;

    return [
      {
        title: "إجمالي الاشتراكات",
        value: subscriptions.length.toLocaleString("ar"),
        helper: "كل الاشتراكات المسترجعة",
        tone: "yellow",
        compact: true,
      },
      {
        title: "الاشتراكات النشطة",
        value: activeCount.toLocaleString("ar"),
        helper: "حالة العضوية active",
        tone: "green",
        compact: true,
      },
      {
        title: "المبالغ المدفوعة",
        value: formatMoney(totalPaid),
        helper: "حسب paid_amount",
        tone: "blue",
        compact: true,
      },
      {
        title: "المتبقي للتحصيل",
        value: formatMoney(totalRemaining),
        helper: `${soon.toLocaleString("ar")} اشتراك ينتهي خلال ٧ أيام`,
        tone: "purple",
        compact: true,
      },
    ];
  }, [subscriptions]);

  const errorMessage =
    error?.data?.message ||
    (error?.status || error?.error
      ? `رمز الخطأ: ${error?.status || error?.error}`
      : "");

  return {
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
    subscriptions,
    selectedSubscription,
    filteredSubscriptions,
    stats,
    errorMessage,
  };
}
