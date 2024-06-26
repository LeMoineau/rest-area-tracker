<template>
  <div class="flex justify-between items-center h-full">
    <router-link to="/" @click="resetHeaderSearch">
      <el-text size="large">Rest Area Tracker</el-text></router-link
    >
    <el-autocomplete
      v-model="search"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      clearable
      class="w-full max-w-[450px]"
      size="large"
      placeholder="Search rest area"
      @select="selectSearch"
      @keydown.enter="submitSearch"
    >
      <template #prefix>
        <el-icon class="el-input__icon">
          <Search></Search>
        </el-icon>
      </template>
    </el-autocomplete>
    <div class="flex justify-between items-center h-full gap-3">
      <el-text size="large">Guest</el-text>
      <el-avatar id="test"></el-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRestAreaStore } from "../../stores/use-rest-area.store";
import { useSettingsStore } from "../../stores/use-settings.store";
import { useRouter } from "vue-router";

const MIN_SEARCH_LENGTH = 3;
const search = ref("");
const { filterRestAreasByName } = useRestAreaStore();
const { setHeaderSearch } = useSettingsStore();
const router = useRouter();

const querySearch = (queryString: string, cb: any) => {
  if (queryString.length < MIN_SEARCH_LENGTH) {
    return;
  }

  cb(
    filterRestAreasByName(queryString).map((a) => ({
      value: `${a.aire} (${a.sens})`,
      id: a.id,
    }))
  );
};

const submitSearch = (evt: KeyboardEvent) => {
  if (evt.target === null || !(evt.target instanceof HTMLElement)) return;
  evt.target.blur();
};

watch(search, (newSearch) => {
  setHeaderSearch(newSearch);
});

const selectSearch = (selected: { value: string; id: string }) => {
  console.log(selected);
  router.push({
    name: "rest-area",
    params: { id: selected.id },
  });
};

const resetHeaderSearch = () => {
  search.value = "";
};
</script>
