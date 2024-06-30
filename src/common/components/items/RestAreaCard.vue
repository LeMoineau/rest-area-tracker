<template>
  <router-link :to="{ name: 'rest-area', params: { id: restArea.id } }">
    <div
      class="w-[--rest-area-card-width] border rounded overflow-hidden bg-white text-black"
    >
      <el-image
        class="flex flex-col w-full h-36 items-center justify-center"
        fit="cover"
        :src="restArea.img"
      ></el-image>
      <div class="flex flex-col items-start justify-center px-4 py-3 gap-2">
        <h4 class="w-full text-left truncate">
          {{ restArea.aire }}
        </h4>
        <div class="flex flex-row items-center gap-2 w-full overflow-hidden">
          <el-tag size="small">{{ restArea.sens }}</el-tag>
          <p class="text-xs" v-if="restArea.carburant">⛽</p>
          <p class="text-xs" v-if="restArea.recharge_electrique">⚡</p>
          <p class="text-xs" v-if="restArea.restauration">🍴</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import RestArea from "../../types/rest-area/RestArea";

const { restArea } = defineProps<{ restArea: RestArea }>();
</script>
