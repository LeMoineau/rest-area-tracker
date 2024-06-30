<template>
  <div class="flex flex-col max-w-[--body-width] w-full">
    <div class="flex flex-row items-center gap-4 border-b pb-6">
      <el-avatar
        size="large"
        :icon="UserFilled"
        :src="getUser()?.photoURL ?? undefined"
      ></el-avatar>
      <div class="flex flex-col justify-center items-start">
        <h1 class="font-semibold text-xl">
          {{ getUser()?.displayName ?? getUser()?.email }}
        </h1>
        <p v-if="getUser()?.displayName" class="opacity-70 text-sm">
          {{ getUser()?.email }}
        </p>
      </div>
    </div>
    <!-- Badges -->
    <div class="flex flex-col w-full py-6">
      <h2 class="text-left font-semibold">Badges</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserDataStore } from "../../../common/stores/use-user-data.store";
import { useUserStore } from "../../../common/stores/use-user.store";
import { UserFilled } from "@element-plus/icons-vue";

const { getUser } = useUserStore();
const { getCurrentUserData } = useUserDataStore();
</script>
