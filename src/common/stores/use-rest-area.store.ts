import { defineStore } from "pinia";
import RestArea from "../types/RestArea";
import { ref } from "vue";
import restAreaJson from "./../config/database/rest-area-db.json";

export const useRestAreaStore = defineStore("rest-area", () => {
  const restAreas = ref<RestArea[]>(restAreaJson as RestArea[]);

  return {
    restAreas,
  };
});
