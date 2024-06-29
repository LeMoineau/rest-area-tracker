<template>
  <el-container class="flex-wrap">
    <GlobalHeader></GlobalHeader>
    <el-main style="--el-main-padding: 0px">
      <div class="flex flex-row justify-center items-center w-full">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import GlobalHeader from "../common/components/navigation/GlobalHeader.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "../common/stores/use-user.store";

const { setUser, resetUser } = useUserStore();

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user === null) {
      resetUser();
      return;
    }
    setUser(user);
    console.log("user changed!", user);
  });
});
</script>
