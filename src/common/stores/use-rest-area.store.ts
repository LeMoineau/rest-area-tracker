import { defineStore } from "pinia";
import RestArea from "../types/RestArea";
import { ref } from "vue";
import restAreaJson from "./../config/database/rest-area-db.json";

export const useRestAreaStore = defineStore("rest-area", () => {
  const restAreas = ref<RestArea[]>(restAreaJson as RestArea[]);

  const getByName = (name: string): RestArea[] => {
    return restAreas.value.filter(
      (a) =>
        a.aire.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(a.aire.toLowerCase())
    );
  };

  const getById = (id: string): RestArea | undefined => {
    return restAreas.value.find((a) => a.id === id);
  };

  const getAllAutoroutes = (): string[] => {
    return [...new Set(restAreas.value.map((a) => a.autoroute))];
  };

  return {
    restAreas,
    getByName,
    getById,
    getAllAutoroutes,
  };
});
