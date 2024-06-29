<template>
  <div class="flex flex-col sm:flex-row w-full h-[--main-body-height]">
    <div
      class="bg-blue-400 w-full sm:w-2/3 flex h-1/4 sm:h-auto flex-col justify-center items-center text-white"
    >
      <p class="font-semibold text-xl">
        Rejoignez l'aventure des férus d'aires d'autoroutes !
      </p>
      <p class="font-light">Parce que, oui !, ça existe</p>
    </div>
    <div
      class="flex flex-col gap-2 w-full h-full sm:h-auto items-center justify-start sm:justify-center sm:pt-0 pt-16"
    >
      <h1 class="font-semibold mb-4 text-xl">Connectez vous !</h1>
      <div class="max-w-[300px] w-full flex flex-col gap-2">
        <el-input v-model="email" type="email" placeholder="Adresse mail">
          <template #prepend>
            <el-button :icon="User" />
          </template>
        </el-input>
        <el-input
          v-model="password"
          type="password"
          placeholder="Password"
          show-password
        >
          <template #prepend>
            <el-button :icon="Lock" />
          </template>
        </el-input>
      </div>

      <el-button @click="register" type="primary" class="mt-6"
        >Se connecter</el-button
      >
      <el-button @click="signInWithGoogle">Se connecter avec Google</el-button>
      <p class="text-sm mt-6 w-1/2 border-t pt-6">
        Vous n'avez pas encore de compte ?
      </p>
      <router-link to="register">
        <el-button @click="register" type="success">
          Créer un compte
        </el-button></router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const router = useRouter();

const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((res) => {
      console.log("user logged!", res);
      router.push("/");
    })
    .catch((err) => {
      console.error("error during user creation!", err.code);
    });
};

const signInWithGoogle = () => {};
</script>
