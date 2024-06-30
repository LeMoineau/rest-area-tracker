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

const email = ref("");
const password = ref("");

const router = useRouter();
const { register, signInWithGoogle } = useUserAuth();

const handleRegister = () => {
  register(
    email.value,
    password.value,
    () => {
      router.push("/");
    },
    (errorCode) => ErrorUtils.generateErrorFromAuthErrorCode(errorCode)
  );
};

const handleSignInWithGoogle = () => {
  signInWithGoogle(
    () => {
      router.push("/");
    },
    (errorCode) => ErrorUtils.generateErrorFromAuthErrorCode(errorCode)
  );
};
</script>
