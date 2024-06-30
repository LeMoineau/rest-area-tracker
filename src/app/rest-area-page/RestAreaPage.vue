<template>
  <div class="max-w-[--body-width] w-full px-4">
    <!-- Page Header -->
    <div
      class="flex flex-row justify-between items-center border-b pt-6 pb-4 flex-wrap gap-2"
    >
      <div class="flex flex-row items-center gap-2">
        <div class="flex flex-col justify-start items-start">
          <h1 class="text-2xl font-bold">{{ restArea?.aire }}</h1>
          <div class="flex flex-row items-center gap-2">
            <p>Autoroute {{ restArea?.autoroute }}</p>
            <el-tag size="small">{{ restArea?.sens }}</el-tag>
          </div>
        </div>
      </div>
      <el-button size="large" type="primary" disabled>
        Réclamer le badge <el-icon class="el-icon--right"><Medal /></el-icon
      ></el-button>
      <el-button size="large">
        Déjà visitée <el-icon class="el-icon--right"><Check /></el-icon
      ></el-button>
    </div>
    <!-- Page Core -->
    <div class="py-4 w-full">
      <div class="flex flex-row gap-4">
        <el-descriptions :border="true" :column="1" class="w-full">
          <template #title>
            <h2 class="font-semibold">Informations</h2>
          </template>
          <el-descriptions-item label="Type">
            <el-tag> {{ restArea?.type }} </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Kilométrage">
            {{ restArea?.localisation }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="restArea?.equipements_aire_de_repos"
            label="Equipement d'aire de repos"
          >
            <YesNoTag :value="restArea?.equipements_aire_de_repos"></YesNoTag>
          </el-descriptions-item>
          <el-descriptions-item
            v-if="restArea?.carburant"
            label="Fournisseur de Carburant"
          >
            {{ restArea?.carburant }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="restArea?.recharge_electrique"
            label="Recharge Electrique"
          >
            <YesNoTag :value="restArea?.recharge_electrique"></YesNoTag>
          </el-descriptions-item>
          <el-descriptions-item
            v-if="restArea?.restauration"
            label="Restaurants"
          >
            {{ restArea?.restauration }}
          </el-descriptions-item>
          <el-descriptions-item v-if="restArea?.autres" label="Autres">
            {{ restArea?.autres }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="flex flex-row pt-6 gap-2">
        <div class="flex flex-col text-left w-full">
          <h2 class="font-semibold pb-1">Commentaires</h2>
          <p class="h-full w-full border rounded p-4">
            {{ restArea?.commentaires ?? "Aucun commentaire" }}
          </p>
        </div>
      </div>
      <div class="flex flex-col items-start pt-6" v-if="restArea?.img">
        <h2 class="font-semibold pb-1">Images</h2>
        <el-image
          class="flex flex-col items-center justify-center rounded"
          fit="cover"
          :src="restArea?.img"
        ></el-image>
      </div>
    </div>
    <!-- Suggestions -->
    <div class="py-4 w-full border-t mt-4">
      <h2 class="font-semibold text-left">Autres aires suggerées</h2>
      <el-scrollbar>
        <div class="flex flex-row pt-4 pb-8 gap-4">
          <RestAreaCard
            v-for="(suggestion, index) in suggestions"
            :key="index"
            :restArea="suggestion"
          ></RestAreaCard>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import RestArea from "../../common/types/rest-area/RestArea";
import YesNoTag from "./../../common/components/items/YesNoTag.vue";
import { useRestAreaStore } from "../../common/stores/use-rest-area.store";
import { Check, Medal } from "@element-plus/icons-vue";
import { useRestAreaSuggestions } from "../../common/composables/use-rest-area-suggestions";
import RestAreaCard from "./../../common/components/items/RestAreaCard.vue";

const route = useRoute();
const { getById } = useRestAreaStore();

const restArea = ref<RestArea>();

const { suggestions } = useRestAreaSuggestions(restArea);

onMounted(() => {
  const id = route.params.id;
  if (typeof id !== "string") return;
  restArea.value = getById(id);
  if (restArea.value === undefined) {
    throw new Error(`no rest area found for id "${id}"`);
  }
});
</script>
