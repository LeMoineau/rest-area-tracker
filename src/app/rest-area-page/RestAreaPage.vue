<template>
  <div>{{ restArea?.aire }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import RestArea from "../../common/types/RestArea";
import { useRestAreaStore } from "../../common/stores/use-rest-area.store";

const route = useRoute();
const { restAreas } = useRestAreaStore();
const restArea = ref<RestArea>();

onMounted(() => {
  restArea.value = restAreas.find((a) => a.id === route.params.id);
});
</script>
