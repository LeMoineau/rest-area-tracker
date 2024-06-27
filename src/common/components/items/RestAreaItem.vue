<template>
  <router-link
    :to="{ name: 'rest-area', params: { id: restArea.id } }"
    class="max-w-[1000px] w-full flex flex-col items-center gap-2"
  >
    <el-card class="w-full" shadow="hover">
      {{ restArea.aire }}
      <el-tag class="ml-1">{{ restArea.sens }}</el-tag>
    </el-card>
  </router-link>
</template>

<script setup lang="ts">
import RestArea from "../../types/RestArea";

defineProps<{ restArea: RestArea }>();
</script>
