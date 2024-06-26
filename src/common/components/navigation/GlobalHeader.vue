<template>
  <div class="flex justify-between items-center h-full">
    <router-link to="/">
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
    >
      <template #prefix>
        <el-icon class="el-input__icon">
          <Search></Search>
        </el-icon>
      </template>
    </el-autocomplete>
    <router-link to="/wikitable-converter">coucou</router-link>
    <div class="flex justify-between items-center h-full gap-3">
      <el-text size="large">Guest</el-text>
      <el-avatar></el-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRestAreaStore } from "../../stores/use-rest-area.store";

const MIN_SEARCH_LENGTH = 3;
const search = ref("");
const { restAreas } = useRestAreaStore();

const querySearch = (queryString: string, cb: any) => {
  if (queryString.length < MIN_SEARCH_LENGTH) {
    return;
  }
  console.log(
    restAreas,
    restAreas.filter(
      (a) =>
        a.nom.toLowerCase().includes(queryString.toLowerCase()) ||
        queryString.toLowerCase().includes(a.nom.toLowerCase())
    )
  );
  cb(
    [
      ...new Set(
        restAreas
          .filter(
            (a) =>
              a.nom.toLowerCase().includes(queryString.toLowerCase()) ||
              queryString.toLowerCase().includes(a.nom.toLowerCase())
          )
          .map((a) => a.nom)
      ),
    ].map((nom) => ({ value: nom }))
  );
};

watch(search, (newSearch) => {
  console.log(newSearch);
});
</script>
