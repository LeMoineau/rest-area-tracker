<template>
  <div class="flex flex-col items-center w-full gap-3">
    <RestAreaItem
      v-for="(item, index) in showedRestAreas"
      :key="index"
      :rest-area="item"
    ></RestAreaItem>
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
import RestAreaItem from "./../../common/components/items/RestAreaItem.vue";

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
