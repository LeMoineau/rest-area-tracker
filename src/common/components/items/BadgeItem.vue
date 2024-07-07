<template>
  <el-popover placement="bottom" trigger="hover">
    <template #reference>
      <div
        class="w-14 h-14 rounded-full flex flex-col justify-center items-center overflow-hidden border-4"
      >
        <img class="w-full h-full" :src="restArea?.img" />
      </div>
    </template>
    <div class="flex flex-col justify-center items-center w-full">
      <router-link
        :to="{ name: 'rest-area', params: { id: restArea?.id } }"
        class="font-semibold text-md w-full text-center"
      >
        {{ restArea?.aire }}
      </router-link>
      <p class="text-md w-full text-center">Niveau {{ props.badge.level }}</p>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Badge from "../../types/badges/Badge";
import RestArea from "../../types/rest-area/RestArea";
import useRestAreaBd from "../../composables/use-rest-area-bd";

const props = defineProps<{ badge: Badge }>();

const { restAreas } = useRestAreaBd();

const restArea = ref<RestArea>();

onMounted(() => {
  restArea.value = restAreas.find((a) => a.id === props.badge.restAreaId);
});
</script>
