<template>
  <div class="flex flex-col gap-2 items-center justify-center">
    <h1>Créez votre compte !</h1>
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <el-button @click="register">Créer votre compte</el-button>
    <el-button @click="signInWithGoogle">Se connecter avec Google</el-button>
  </div>
</template>

<script setup lang="ts">
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((res) => {
      console.log("user created!", res);
    })
    .catch((err) => {
      console.error("error during user creation!", err);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err.code));
};
</script>
