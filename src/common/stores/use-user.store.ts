import { User, getAuth, signOut } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const userLoggedIn = ref(false);

  const getUser = (): User | undefined => {
    return user.value;
  };

  const setUser = (u: User) => {
    user.value = u;
    console.log(user.value);
    userLoggedIn.value = true;
  };

  const resetUser = () => {
    user.value = undefined;
    userLoggedIn.value = false;
  };

  const userIsLoggedIn = (): boolean => {
    return userLoggedIn.value;
  };

  const logout = () => {
    signOut(getAuth())
      .then(() => {
        resetUser();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { getUser, userIsLoggedIn, setUser, resetUser, logout };
});
