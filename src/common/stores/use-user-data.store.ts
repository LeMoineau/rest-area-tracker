import { defineStore } from "pinia";
import { ref } from "vue";
import { UserData } from "../types/user/UserData";

export const useUserDataStore = defineStore("user-data", () => {
  const userData = ref<UserData>();

  const setCurrentUserData = (uData: UserData) => {
    userData.value = uData;
  };

  const resetCurrentUserData = () => {
    userData.value = undefined;
  };

  return {
    getCurrentUserData: () => userData.value,
    setCurrentUserData,
    resetCurrentUserData,
  };
});
