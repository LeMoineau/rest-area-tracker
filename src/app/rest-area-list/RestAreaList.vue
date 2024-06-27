<template>
  <div class="flex flex-col items-center w-full gap-3">
    <el-collapse>
      <el-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </el-collapse-item>
    </el-collapse>
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

const { restAreas, getByName } = useRestAreaStore();
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
  allRestAreas.value = getByName(headerSearch.value);
  showRestAreas(1);
});

watch(headerSearch, (newSearch) => {
  if (newSearch.length < DefaultValues.MIN_SEARCH_LENGTH) {
    allRestAreas.value = restAreas;
  } else {
    allRestAreas.value = getByName(newSearch);
  }
  showRestAreas(1);
});
</script>
