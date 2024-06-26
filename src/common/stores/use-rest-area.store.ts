import { defineStore } from "pinia";
import RestArea from "../types/RestArea";
import { ref } from "vue";
import restAreaJson from "./../config/database/rest-area-db.json";

export const useRestAreaStore = defineStore("rest-area", () => {
  const restAreas = ref<RestArea[]>(restAreaJson as RestArea[]);

  const filterRestAreasByName = (name: string): RestArea[] => {
    return restAreas.value.filter(
      (a) =>
        a.aire.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(a.aire.toLowerCase())
    );
  };

  return {
    restAreas,
    filterRestAreasByName,
  };
});
