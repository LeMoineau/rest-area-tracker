import { defineStore } from "pinia";
import { ref } from "vue";
import Badge from "../types/badges/Badge";
import useBadges from "../composables/use-badges";
import { useUserAuth } from "../composables/use-user-auth";

export const useUserDataStore = defineStore("user-data", () => {
  const userBadges = ref<Badge[]>([]);

  const { isConnected, currentUser } = useUserAuth();
  const { getByOwnerId, add } = useBadges();

  const fetchUserBadges = async (props?: { forceFetch?: boolean }) => {
    if (!isConnected()) return;
    if (userBadges.value.length <= 0 || (props && props.forceFetch)) {
      const badges = await getByOwnerId(currentUser()!.uid);
      userBadges.value.push(...badges);
    }
  };

  const addBadge = async (restAreaId: string) => {
    if (!isConnected()) return;
    const badge = await add(currentUser()!.uid, restAreaId);
    userBadges.value.push(badge);
  };

  const alreadyHasBadge = (restAreaId: string): boolean => {
    return (
      userBadges.value.find((b) => b.restAreaId === restAreaId) !== undefined
    );
  };

  return {
    userBadges,
    fetchUserBadges,
    alreadyHasBadge,
    addBadge,
  };
});
