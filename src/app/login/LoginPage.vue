<template>
  <div
    class="flex flex-col-reverse justify-end sm:flex-row w-full min-h-[--main-body-height] h-auto"
  >
    <AuthAd></AuthAd>
    <AuthForm
      type="login"
      v-model:email="email"
      v-model:password="password"
      @submit="handleLogin"
      @sign-in-with-google="handleSignInWithGoogle"
    ></AuthForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserAuth } from "../../common/composables/use-user-auth";
import { ErrorUtils } from "../../common/utils/error-utils";
import AuthAd from "../../common/components/auth/AuthAd.vue";
import AuthForm from "../../common/components/auth/AuthForm.vue";
import { useUserData } from "../../common/composables/use-user-data";
import { useUserDataStore } from "../../common/stores/use-user-data.store";

const email = ref("");
const password = ref("");

const router = useRouter();
const { login, signInWithGoogle } = useUserAuth();
const { fetchUserData, createNewUserData } = useUserData();
const { setCurrentUserData } = useUserDataStore();

const handleLogin = () => {
  login(
    email.value,
    password.value,
    async (userCred) => {
      router.push("/");
      let userData = await fetchUserData(userCred.user.uid);
      if (!userData) {
        console.error(`no user data found for user ${userCred.user.uid}`);
        userData = await createNewUserData(userCred.user);
      }
      setCurrentUserData(userData);
    },
    (errorCode) => ErrorUtils.generateErrorFromAuthErrorCode(errorCode)
  );
};

const handleSignInWithGoogle = () => {
  signInWithGoogle(
    async (userCred) => {
      router.push("/");
      let userData = await fetchUserData(userCred.user.uid);
      if (!userData) {
        userData = await createNewUserData(userCred.user);
      }
      setCurrentUserData(userData);
    },
    (errorCode) => ErrorUtils.generateErrorFromAuthErrorCode(errorCode)
  );
};
</script>
