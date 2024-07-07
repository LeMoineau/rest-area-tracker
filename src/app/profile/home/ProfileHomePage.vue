<template>
  <div class="flex flex-col max-w-[--body-width] w-full">
    <div class="flex flex-row items-center gap-4 border-b pb-6">
      <el-avatar
        size="large"
        :icon="UserFilled"
        :src="user?.photoURL ?? undefined"
      ></el-avatar>
      <div class="flex flex-col justify-center items-start">
        <h1 class="font-semibold text-xl">
          {{ user?.displayName ?? user?.email }}
        </h1>
        <p v-if="user?.displayName" class="opacity-70 text-sm">
          {{ user?.email }}
        </p>
      </div>
    </div>
    <!-- Badges -->
    <div class="flex flex-col w-full py-6">
      <h2 class="text-left font-semibold mb-3">Badges</h2>
      <div class="flex flex-row flex-wrap gap-3">
        <BadgeItem
          v-for="(badge, index) in userBadges"
          :key="index"
          :badge="badge"
        ></BadgeItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserDataStore } from "../../../common/stores/use-user-data.store";
import { useUserStore } from "../../../common/stores/use-user.store";
import { UserFilled } from "@element-plus/icons-vue";
import BadgeItem from "./../../../common/components/items/BadgeItem.vue";

const { user } = storeToRefs(useUserStore());
const { userBadges } = storeToRefs(useUserDataStore());
</script>
