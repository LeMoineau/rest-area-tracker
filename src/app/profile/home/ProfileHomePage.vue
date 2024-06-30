<template>
  <div class="flex flex-col max-w-[--body-width] w-full">
    <div class="flex flex-row items-center">
      <el-avatar></el-avatar>
      <div class="flex flex-col">{{ getUser()?.email }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../../common/stores/use-user.store";

const { getUser } = useUserStore();
</script>
