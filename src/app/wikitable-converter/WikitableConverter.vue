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
  <el-button @click="convertAll">Convert all</el-button>
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

const allURLS = [
  "/wiki/Autoroute_fran%C3%A7aise_A1_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A2_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A3_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A4_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A5_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A6_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A7_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A8_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A9_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A10_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A11_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A11.1_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A13_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A14_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A15_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A16_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A19_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A20_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A23_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A25_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A26_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A28_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A29_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A30_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A31_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A33_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A34_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A35_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A36_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A38_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A39_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A40_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A41_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A42_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A43_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A46_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A47_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A48_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A49_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A50_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A51_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A52_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A54_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A55_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A57_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A61_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A62_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A63_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A64_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A65_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A66_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A68_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A71_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A72_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A75_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A77_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A79_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A81_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A83_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A84_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A85_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A86_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A87_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A88_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A89_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A104_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A105_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A106_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A131_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A150_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A154_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A304_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A311_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A330_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A355_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A391_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A404_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A406_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A410_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A430_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A432_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A500_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A520_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A570_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A620_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A630_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A641_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A645_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A701_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A709_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A714_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A719_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A750_(Aires)",
  "/wiki/Autoroute_fran%C3%A7aise_A837_(Aires)",
];

watch(html, (newHtml) => convert(newHtml));

const convertAll = () => {
  let allRestArea = [];
  let index = 0;

  const intervalId = setInterval(() => {
    if (index >= allURLS.length) {
      console.log("fetching finish!");
      clearInterval(intervalId);
    }
    const targetUrl = allURLS[index];
    console.log(`fetching at index ${index}: `, targetUrl);
    fetch(`https://routes.fandom.com/${targetUrl}`)
      .then((res) => res.text())
      .then((res) => {
        allRestArea.push(...convert(res));
        console.log("progress", allRestArea);
      });
    index += 1;
  }, 500);
};

const convert = (html: string) => {
  const convertContainer = document.createElement("div");
  const list: any = [];
  convertContainer.innerHTML = html;
  const tables = convertContainer.querySelectorAll(
    ".wikitable:not(.mw-collapsible)"
  );
  tables.forEach((table) => {
    const lines = table.querySelectorAll("tr");
    lines.forEach((line) => {
      const cols = line.querySelectorAll("td");
      let index = 0;
      let json: any = {};
      cols.forEach((col) => {
        const value = col.textContent!.trim();
        json[headers.value[index]] = value === "/" ? undefined : value;
        index += 1;
      });
      if (Object.keys(json).length <= 0) return;
      list.push(json);
    });
  });
  return list;
};
</script>
