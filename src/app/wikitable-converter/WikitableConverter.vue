<template>
  <div class="flex flex-row justify-center items-center gap-4 w-full">
    <textarea
      v-model="html"
      style="width: 400px; height: 300px"
      class="border"
    ></textarea>
    <el-button @click="convert(html)"> convert </el-button>
    <textarea
      v-model="convertedValue"
      style="width: 400px; height: 300px"
      class="border"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const html = ref("");
const headers = ref([
  "nom",
  "type",
  "localisation",
  "equipement_aire_de_repos",
  "carburant",
  "recharge_electrique",
  "restauration",
  "autres",
  "commentaires",
]);
const convertedValue = ref("");

watch(html, (newHtml) => convert(newHtml));

const convert = (html) => {
  const convertContainer = document.createElement("div");
  convertContainer.innerHTML = html;
  const lines = convertContainer.querySelectorAll("tr");
  const list = [];
  lines.forEach((line) => {
    const cols = line.querySelectorAll("td");
    let index = 0;
    let json = {};
    cols.forEach((col) => {
      const value = col.textContent.trim();
      json[headers.value[index]] = value === "/" ? undefined : value;
      index += 1;
    });
    if (Object.keys(json).length <= 0) return;
    list.push(json);
  });
  convertedValue.value = JSON.stringify(list);
};
</script>
