import { useMemo, useState } from "react";
import {
  useGetMembersQuery,
  useCreatePlayerMutation,
  useUpdatePlayerMutation,
} from "@/lib/api/membersApi";
import { useGetBranchesQuery } from "@/lib/api/branchesApi";
import { useGetSubscriptionPlansQuery } from "@/lib/api/subscriptionPlansApi";

function getMembersArray(response) {
  return Array.isArray(response?.data) ? response.data : [];
}

function getBranchesArray(response) {
  return Array.isArray(response?.data) ? response.data : [];
}

function getPlansArray(response) {
  return Array.isArray(response?.data) ? response.data : [];
}

export function useMembers() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [drawerMode, setDrawerMode] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [formError, setFormError] = useState("");

  const { data, error, isLoading, refetch } = useGetMembersQuery();
  const { data: branchesData } = useGetBranchesQuery();
  const { data: plansData } = useGetSubscriptionPlansQuery();

  const [createPlayer, { isLoading: isCreating }] = useCreatePlayerMutation();
  const [updatePlayer, { isLoading: isUpdating }] = useUpdatePlayerMutation();

  const members = useMemo(() => getMembersArray(data), [data]);
  const branches = useMemo(() => getBranchesArray(branchesData), [branchesData]);
  const plans = useMemo(() => getPlansArray(plansData), [plansData]);

  const selectedMember = useMemo(
    () => members.find((m) => m.id === selectedMemberId) || null,
    [members, selectedMemberId],
  );

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return members.filter((m) => {
      const fullName = `${m.first_name || ""} ${m.last_name || ""}`.trim().toLowerCase();
      const mobileVal = m.mobile || "";

      const matchesBranch =
        branchFilter === "all" || String(m.branch_id) === String(branchFilter);
      const matchesGender =
        genderFilter === "all" || m.gender === genderFilter;

      const matchesSearch =
        !normalizedSearch ||
        fullName.includes(normalizedSearch) ||
        mobileVal.includes(normalizedSearch);

      return matchesBranch && matchesGender && matchesSearch;
    });
  }, [members, search, branchFilter, genderFilter]);

  const stats = useMemo(() => {
    const activeCount = members.filter((m) => m.is_active !== false).length;
    const maleCount = members.filter((m) => m.gender === "male").length;
    const femaleCount = members.filter((m) => m.gender === "female").length;

    return [
      {
        title: "إجمالي الأعضاء",
        value: members.length.toLocaleString("ar"),
        helper: "كل اللاعبين المسجلين",
        tone: "yellow",
        compact: true,
      },
      {
        title: "الأعضاء النشطين",
        value: activeCount.toLocaleString("ar"),
        helper: "اللاعبين ذوي الاشتراكات الفعالة",
        tone: "green",
        compact: true,
      },
      {
        title: "الذكور",
        value: maleCount.toLocaleString("ar"),
        helper: "اللاعبين الرجال",
        tone: "blue",
        compact: true,
      },
      {
        title: "الإناث",
        value: femaleCount.toLocaleString("ar"),
        helper: "اللاعبات السيدات",
        tone: "purple",
        compact: true,
      },
    ];
  }, [members]);

  function closeDrawer() {
    setDrawerMode(null);
    setSelectedMemberId(null);
    setFormError("");
  }

  async function handleCreate(values) {
    setFormError("");
    try {
      await createPlayer(values).unwrap();
      closeDrawer();
    } catch (submitError) {
      setFormError(
        submitError?.data?.message ||
          "تعذر إضافة العضو. تحقق من البيانات وحاول مرة أخرى.",
      );
    }
  }

  async function handleUpdate(values) {
    if (!selectedMemberId) return;
    setFormError("");
    try {
      await updatePlayer({ id: selectedMemberId, body: values }).unwrap();
      closeDrawer();
    } catch (submitError) {
      setFormError(
        submitError?.data?.message ||
          "تعذر تعديل بيانات العضو. تحقق من البيانات وحاول مرة أخرى.",
      );
    }
  }

  function getEditInitialValues() {
    if (!selectedMember) return null;

    const contact = selectedMember.additional_contacts?.[0] || null;

    return {
      first_name: selectedMember.first_name || "",
      last_name: selectedMember.last_name || "",
      mobile_country_code: selectedMember.mobile_country_code || "+963",
      mobile: selectedMember.mobile || "",
      gender: selectedMember.gender || "male",
      dob: selectedMember.dob || "",
      branch_id: String(selectedMember.branch_id || ""),
      emergency_name: contact?.name || "",
      emergency_relation: contact?.relation || "Father",
      emergency_country_code: contact?.country_code || "+963",
      emergency_phone: contact?.phone_number || "",
    };
  }

  return {
    search,
    setSearch,
    branchFilter,
    setBranchFilter,
    genderFilter,
    setGenderFilter,
    drawerMode,
    setDrawerMode,
    selectedMemberId,
    setSelectedMemberId,
    formError,
    setFormError,
    isLoading,
    error,
    refetch,
    filteredMembers,
    stats,
    selectedMember,
    isCreating,
    isUpdating,
    handleCreate,
    handleUpdate,
    getEditInitialValues,
    branches,
    plans,
    closeDrawer,
  };
}
