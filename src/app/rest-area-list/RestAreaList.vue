<template>
  <div class="flex flex-col items-center w-full gap-3">
    <div
      v-for="(item, index) in showedRestAreas"
      :key="index"
      class="max-w-[1000px] w-full flex flex-col items-center gap-2"
    >
      <el-card class="w-full" shadow="hover"
        >{{ index }} - {{ item.aire }}</el-card
      >
    </div>
    <el-pagination
      :page-size="PAGE_SIZE"
      :pager-count="5"
      layout="prev, pager, next"
      :total="restAreas.length"
      @change="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRestAreaStore } from "../../common/stores/use-rest-area.store";
import RestArea from "../../common/types/RestArea";

const PAGE_SIZE = 20;

const { restAreas } = useRestAreaStore();
const showedRestAreas = ref<RestArea[]>();

const changePage = (page: number) => {
  showRestAreas(page);
  window.scrollTo(0, 0);
};

const showRestAreas = (page: number) => {
  showedRestAreas.value = restAreas.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
};

onMounted(() => {
  showRestAreas(1);
});
</script>
