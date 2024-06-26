import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const headerSearch = ref("");

  const setHeaderSearch = (newSearch: string) => {
    headerSearch.value = newSearch;
  };

  return { headerSearch, setHeaderSearch };
});
