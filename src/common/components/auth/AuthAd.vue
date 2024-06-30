<template>
  <div
    class="bg-blue-400 w-full sm:w-2/3 flex h-auto py-6 sm:h-auto flex-col justify-center items-center text-white"
  >
    <p class="font-semibold text-xl">
      Rejoignez l'aventure des férus d'aires d'autoroutes !
    </p>
    <p class="font-light">Parce que, oui !, ça existe</p>
    <p class="mt-6 mb-6 border-t pt-6 px-6 max-w-full">
      Plus de milles aires d'autoroute à découvrir et collectioner !
    </p>
    <RestAreaCard
      :rest-area="getById('6cc16432-3695-4d80-af39-b23237f8a21e')!"
    ></RestAreaCard>
  </div>
</template>

<script setup lang="ts">
import { useRestAreaStore } from "../../stores/use-rest-area.store";
import RestAreaCard from "../items/RestAreaCard.vue";

const { getById } = useRestAreaStore();
</script>
