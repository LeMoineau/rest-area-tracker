<template>
  <div class="flex flex-col items-center w-full gap-3">
    <RestAreaItem
      v-for="(item, index) in showedRestAreas"
      :key="index"
      :rest-area="item"
    ></RestAreaItem>
    <el-pagination
      :page-size="DefaultValues.PAGE_SIZE"
      :pager-count="5"
      layout="prev, pager, next"
      :total="allRestAreas.length"
      @change="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRestAreaStore } from "../../common/stores/use-rest-area.store";
import RestArea from "../../common/types/RestArea";
import RestAreaItem from "./../../common/components/items/RestAreaItem.vue";
import { useSettingsStore } from "../../common/stores/use-settings.store";
import { storeToRefs } from "pinia";
import { DefaultValues } from "./../../common/config/default-values";

const { restAreas, filterRestAreasByName } = useRestAreaStore();
const { headerSearch } = storeToRefs(useSettingsStore());

const allRestAreas = ref<RestArea[]>([]);
const showedRestAreas = ref<RestArea[]>([]);

const changePage = (page: number) => {
  showRestAreas(page);
  window.scrollTo(0, 0);
};

const showRestAreas = (page: number) => {
  showedRestAreas.value = allRestAreas.value.slice(
    (page - 1) * DefaultValues.PAGE_SIZE,
    page * DefaultValues.PAGE_SIZE
  );
};

onMounted(() => {
  allRestAreas.value = filterRestAreasByName(headerSearch.value);
  showRestAreas(1);
});

watch(headerSearch, (newSearch) => {
  if (newSearch.length < DefaultValues.MIN_SEARCH_LENGTH) {
    allRestAreas.value = restAreas;
  } else {
    allRestAreas.value = filterRestAreasByName(newSearch);
  }
  showRestAreas(1);
});
</script>
