<template>
  <div class="flex flex-row w-full">
    <CustomAside v-model:hide-aside="hideFilters">
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

        <el-collapse-item title="Informations non renseignées" name="2">
          <el-checkbox-group
            v-model="filters.hasNotFields"
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

        <el-collapse-item title="Autoroutes" name="3">
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
      <template #actions-prepend>
        <el-button @click="resetFilters">Réinitialiser les filtres</el-button>
      </template>
    </CustomAside>
    <div class="flex flex-col items-center w-full gap-3 px-8 py-8">
      <div class="flex flex-row justify-center flex-wrap w-full gap-5">
        <RestAreaCard
          v-for="(item, index) in showedRestAreas"
          :key="index"
          :rest-area="item"
        ></RestAreaCard>
      </div>
      <el-pagination
        class="mt-4"
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
import RestArea from "../../common/types/rest-area/RestArea";
import { useSettingsStore } from "../../common/stores/use-settings.store";
import { storeToRefs } from "pinia";
import { DefaultValues } from "./../../common/config/default-values";
import { RestAreaFilter } from "../../common/types/rest-area/RestAreaFilter";
import { OPTIONAL_REST_AREA_FIELDS_LABEL } from "../../common/config/enums/RestAreaFieldsLabel";
import RestAreaCard from "../../common/components/items/RestAreaCard.vue";
import CustomAside from "../../common/components/navigation/CustomAside.vue";

const { restAreas, getByName, getAllAutoroutes } = useRestAreaStore();
const { headerSearch } = storeToRefs(useSettingsStore());

const allRestAreas = ref<RestArea[]>([]);
const showedRestAreas = ref<RestArea[]>([]);
const hideFilters = ref(true);
const filters = reactive<RestAreaFilter>({
  hasFields: [],
  hasNotFields: [],
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
    allRestAreas.value = allRestAreas.value.filter(
      (a) => a[field] !== undefined
    );
  }

  // FILTER REST AREA NOT FIELDS
  for (let field of props.newFilters!.hasNotFields) {
    allRestAreas.value = allRestAreas.value.filter(
      (a) => a[field] === undefined
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
  filters.hasNotFields = [];
};
</script>
