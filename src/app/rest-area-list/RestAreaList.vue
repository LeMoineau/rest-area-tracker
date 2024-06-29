<template>
  <div class="flex flex-row w-full">
    <div
      :class="`${hideFilters ? 'w-0' : 'w-full'}`"
      class="absolute bg-white h-full sm:relative border-r sm:h-auto sm:w-full sm:max-w-[--filter-aside-max-width] pb-8"
    >
      <el-button
        style="
          --el-border-radius-base: 0 50px 50px 0px;
          padding-left: 12px;
          padding-right: 12px;
        "
        :class="`${hideFilters ? 'opacity-100' : 'opacity-0'}`"
        class="sm:opacity-0 absolute right-0 top-4 translate-x-full rounded-e-full"
        :icon="hideFilters ? ArrowRight : ArrowLeft"
        size="large"
        @click="hideFilters = !hideFilters"
      ></el-button>

      <div
        :class="`${hideFilters ? 'hidden' : ''}`"
        class="sm:flex flex-col text-left justify-start items-start w-full overflow-hidden p-4"
      >
        <h3 class="font-semibold">Filtres</h3>
        <p class="text-sm opacity-[0.8]">{{ allRestAreas.length }} résultats</p>
        <el-collapse class="w-full mt-2">
          <el-collapse-item title="Informations renseignées" name="1">
            <el-checkbox-group
              v-model="filters.hasFields"
              class="flex flex-wrap items-start justify-start"
            >
              <el-checkbox-button
                v-for="(label, field, index) in OPTIONAL_REST_AREA_FIELDS_LABEL"
                :key="index"
                :value="field"
                class="border-l rounded overflow-hidden"
              >
                {{ label }}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-collapse-item>

          <el-collapse-item title="Autoroutes" name="2">
            <el-checkbox-group
              v-model="filters.autoroutes"
              class="flex flex-wrap items-start justify-start"
            >
              <el-checkbox-button
                v-for="(label, index) in getAllAutoroutes()"
                :key="index"
                :value="label"
                class="border-l rounded overflow-hidden"
              >
                {{ label }}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-collapse-item>
        </el-collapse>
        <div class="flex flex-row mt-4">
          <el-button @click="resetFilters">Réinitialiser les filtres</el-button>
          <el-button
            class="sm:opacity-0"
            type="primary"
            @click="hideFilters = !hideFilters"
            >Fermer</el-button
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center w-full gap-3 pt-6 px-8">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRestAreaStore } from "../../common/stores/use-rest-area.store";
import RestArea from "../../common/types/RestArea";
import RestAreaItem from "./../../common/components/items/RestAreaItem.vue";
import { useSettingsStore } from "../../common/stores/use-settings.store";
import { storeToRefs } from "pinia";
import { DefaultValues } from "./../../common/config/default-values";
import { RestAreaFilter } from "../../common/types/RestAreaFilter";
import { OPTIONAL_REST_AREA_FIELDS_LABEL } from "../../common/config/enums/RestAreaFieldsLabel";
import { ArrowRight, ArrowLeft } from "@element-plus/icons-vue";

const { restAreas, getByName, getAllAutoroutes } = useRestAreaStore();
const { headerSearch } = storeToRefs(useSettingsStore());

const allRestAreas = ref<RestArea[]>([]);
const showedRestAreas = ref<RestArea[]>([]);
const hideFilters = ref(true);
const filters = reactive<RestAreaFilter>({
  hasFields: [],
  autoroutes: [],
});

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
  applyFiltersAndHeaderQuery({ newSearch });
});

watch(filters, (newFilters) => {
  console.log(newFilters);
  applyFiltersAndHeaderQuery({ newFilters });
});

const applyFiltersAndHeaderQuery = (props?: {
  newSearch?: string;
  newFilters?: RestAreaFilter;
}) => {
  if (!props) {
    props = {
      newSearch: headerSearch.value,
      newFilters: filters,
    };
  } else {
    if (!props.newFilters) props.newFilters = filters;
    if (!props.newSearch) props.newSearch = headerSearch.value;
  }

  // HEADER SEARCH
  if (props.newSearch!.length < DefaultValues.MIN_SEARCH_LENGTH) {
    allRestAreas.value = restAreas;
  } else {
    allRestAreas.value = getByName(props.newSearch!);
  }

  // FILTER REST AREA FIELDS
  for (let field of props.newFilters!.hasFields) {
    console.log(field);
    allRestAreas.value = allRestAreas.value.filter(
      (a) => a[field] !== undefined
    );
  }

  // FILTER AUTOROUTES
  if (props.newFilters!.autoroutes.length > 0) {
    allRestAreas.value = allRestAreas.value.filter((a) =>
      props.newFilters!.autoroutes.includes(a.autoroute)
    );
  }

  showRestAreas(1);
};

const resetFilters = () => {
  console.log(filters);
  filters.autoroutes = [];
  filters.hasFields = [];
};
</script>
