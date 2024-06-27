import { Ref, ref, watch } from "vue";
import { useRestAreaStore } from "../stores/use-rest-area.store";
import RestArea from "../types/RestArea";

export const useRestAreaSuggestions = (restArea: Ref<RestArea | undefined>) => {
  const { restAreas } = useRestAreaStore();

  const suggestions = ref<RestArea[]>([]);

  watch(restArea, (newRestArea) => {
    if (!newRestArea) return;
    generateSuggestions(newRestArea);
  });

  const generateSuggestions = (restArea: RestArea): RestArea[] => {
    suggestions.value = restAreas.filter(
      (a) =>
        (a.aire === restArea.aire || a.autoroute === restArea.autoroute) &&
        a.id !== restArea.id
    );
    return suggestions.value;
  };

  return { suggestions, generateSuggestions };
};
