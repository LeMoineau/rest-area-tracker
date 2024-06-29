import { Ref, ref, watch } from "vue";
import { useRestAreaStore } from "../stores/use-rest-area.store";
import RestArea from "../types/RestArea";

export const useRestAreaSuggestions = (
  restArea: Ref<RestArea | undefined>,
  maxSuggestions?: number
) => {
  const { restAreas } = useRestAreaStore();

  const suggestions = ref<RestArea[]>([]);

  watch(restArea, (newRestArea) => {
    if (!newRestArea) return;
    generateSuggestions(newRestArea);
  });

  const generateSuggestions = (restArea: RestArea): RestArea[] => {
    const suggest = restAreas.filter(
      (a) =>
        (a.aire === restArea.aire || a.autoroute === restArea.autoroute) &&
        a.id !== restArea.id
    );
    suggestions.value = maxSuggestions
      ? suggest.slice(0, maxSuggestions)
      : suggest;
    return suggestions.value;
  };

  return { suggestions, generateSuggestions };
};
