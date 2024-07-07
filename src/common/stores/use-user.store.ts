import { User } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const isConnected = ref(false);

  const setUser = (u: User) => {
    user.value = u;
    isConnected.value = true;
  };

  const resetUser = () => {
    user.value = undefined;
    isConnected.value = false;
  };

  return { user, isConnected, setUser, resetUser };
});
