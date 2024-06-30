<template>
  <div
    class="flex flex-col gap-2 w-full h-full sm:h-auto items-center justify-start sm:justify-center py-6 pb-12"
  >
    <h1 class="font-semibold mb-4 text-xl">
      {{ type === "login" ? "Connectez vous !" : "Créez votre compte !" }}
    </h1>
    <div class="max-w-[300px] w-full flex flex-col gap-2">
      <el-input v-model="email" type="email" placeholder="Adresse mail">
        <template #prepend>
          <el-button :icon="User" disabled />
        </template>
      </el-input>
      <el-input
        v-model="password"
        type="password"
        placeholder="Password"
        show-password
      >
        <template #prepend>
          <el-button :icon="Lock" disabled />
        </template>
      </el-input>
    </div>

    <el-button @click="emit('submit')" type="primary" class="mt-6">
      {{ type === "login" ? "Se connecter" : "Créer votre compte" }}</el-button
    >
    <el-button @click="emit('signInWithGoogle')"
      >Se connecter avec Google</el-button
    >
    <p class="text-sm mt-6 w-1/2 border-t pt-6">
      {{
        type === "login"
          ? "Vous n'avez pas encore de compte ?"
          : "Vous avez déjà un compte ?"
      }}
    </p>
    <router-link :to="type === 'login' ? '/register' : '/login'">
      <el-button type="success">
        {{ type === "login" ? "Créer un compte" : "Se connecter" }}
      </el-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";

const { type } = defineProps<{ type: "login" | "register" }>();

const email = defineModel("email");
const password = defineModel("password");

const emit = defineEmits<{
  (e: "submit"): void;
  (e: "signInWithGoogle"): void;
}>();
</script>
