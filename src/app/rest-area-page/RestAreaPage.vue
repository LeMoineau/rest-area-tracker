<template>
  <div class="max-w-[--body-width] w-full px-4">
    <!-- Page Header -->
    <div class="flex flex-row justify-between items-center border-b pb-4">
      <div class="flex flex-col justify-start items-start">
        <h1 class="text-2xl font-bold">{{ restArea?.aire }}</h1>
        <div class="flex flex-row items-center gap-2">
          <p>Autoroute {{ restArea?.autoroute }}</p>
          <el-tag size="small">{{ restArea?.sens }}</el-tag>
        </div>
      </div>
      <el-button size="large">
        Déjà visitée <el-icon class="el-icon--right"><Check /></el-icon
      ></el-button>
    </div>
    <!-- Page Core -->
    <div class="py-4 w-full">
      <el-descriptions :border="true" :column="1">
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
          v-if="restArea?.equipement_aire_de_repos"
          label="Recharge Electrique"
        >
          <YesNoTag :value="restArea?.equipement_aire_de_repos"></YesNoTag>
        </el-descriptions-item>
        <el-descriptions-item v-if="restArea?.restauration" label="Restaurants">
          {{ restArea?.restauration }}
        </el-descriptions-item>
        <el-descriptions-item v-if="restArea?.autres" label="Autres">
          {{ restArea?.autres }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- Suggestions -->
    <div class="py-4 w-full border-t mt-4">
      <h2 class="font-semibold text-left">Autres aires suggerées</h2>
      <el-scrollbar>
        <div class="flex flex-row pt-4 pb-8 gap-4">
          <router-link
            v-for="(suggestion, index) in suggestions"
            :key="index"
            :to="{ name: 'rest-area', params: { id: suggestion.id } }"
          >
            <el-card class="min-w-[250px] w-full"
              ><template #header>
                <h4 class="text-left">
                  {{ suggestion.aire }}
                  <el-tag size="small">{{ restArea?.sens }}</el-tag>
                </h4>
              </template>
            </el-card>
          </router-link>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import RestArea from "../../common/types/RestArea";
import YesNoTag from "./../../common/components/items/YesNoTag.vue";
import { useRestAreaStore } from "../../common/stores/use-rest-area.store";
import { Check } from "@element-plus/icons-vue";
import { useRestAreaSuggestions } from "../../common/composables/use-rest-area-suggestions";

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
