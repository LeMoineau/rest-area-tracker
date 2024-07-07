<template>
  <el-popover placement="top-start" :width="200" trigger="hover">
    <template #reference>
      <div class="flex flex-row items-center gap-3">
        <el-text size="large">
          {{ userName }}
        </el-text>
        <el-avatar
          :icon="UserFilled"
          :src="user?.photoURL ?? undefined"
        ></el-avatar>
      </div>
    </template>
    <div class="flex flex-col justify-start items-start gap-2">
      <p class="font-semibold text-md pb-2 mb-2 border-b w-full text-left">
        {{ userName }}
      </p>
      <div
        class="flex flex-col justify-start items-start gap-2"
        v-if="!isConnected"
      >
        <router-link to="/login">
          <el-button> Se connecter </el-button>
        </router-link>
        <router-link to="/register">
          <el-button type="success"> Créer un compte </el-button>
        </router-link>
      </div>
      <div class="flex flex-col justify-start items-start gap-0 w-full" v-else>
        <CustomLink to="/profile" dont-use-active>
          <template #prepend-icon><User></User></template> Votre profile
        </CustomLink>
        <CustomLink to="/profile/settings" dont-use-active>
          <template #prepend-icon><Setting></Setting></template> Paramètres
        </CustomLink>
        <div class="w-full border-t my-2 pb-1"></div>
        <el-button type="danger" @click="handleLogout">
          Se déconnecter
        </el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { UserFilled, User, Setting } from "@element-plus/icons-vue";
import { useUserStore } from "../../stores/use-user.store";
import { useUserAuth } from "../../composables/use-user-auth";
import { computed } from "vue";
import CustomLink from "../navigation/CustomLink.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const { user, isConnected } = storeToRefs(useUserStore());
const { logout } = useUserAuth();
const router = useRouter();

const userName = computed(() =>
  isConnected.value ? user.value?.displayName ?? user.value?.email : "Invité"
);

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>
