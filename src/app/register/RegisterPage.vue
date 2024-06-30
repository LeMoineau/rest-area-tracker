<template>
  <div
    class="flex flex-col-reverse justify-end sm:flex-row w-full min-h-[--main-body-height] h-auto"
  >
    <AuthAd></AuthAd>
    <AuthForm
      type="register"
      v-model:email="email"
      v-model:password="password"
      @submit="handleRegister"
      @sign-in-with-google="handleSignInWithGoogle"
    ></AuthForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserAuth } from "../../common/composables/use-user-auth";
import { useRouter } from "vue-router";
import { ErrorUtils } from "../../common/utils/error-utils";
import AuthAd from "../../common/components/auth/AuthAd.vue";
import AuthForm from "../../common/components/auth/AuthForm.vue";
import { useUserData } from "../../common/composables/use-user-data";
import { useUserDataStore } from "../../common/stores/use-user-data.store";

const email = ref("");
const password = ref("");

const router = useRouter();
const { register, signInWithGoogle } = useUserAuth();
const { createNewUserData, fetchUserData } = useUserData();
const { setCurrentUserData } = useUserDataStore();

const handleRegister = () => {
  register(
    email.value,
    password.value,
    async (userCred) => {
      router.push("/");
      const newUserData = await createNewUserData(userCred.user);
      setCurrentUserData(newUserData);
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
