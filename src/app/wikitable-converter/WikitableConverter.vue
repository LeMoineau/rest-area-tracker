<template>
  <div class="flex flex-col items-center w-full">
    <div class="flex flex-row justify-center items-center gap-4 w-full">
      <textarea
        v-model="html"
        style="width: 400px; height: 300px"
        class="border"
      ></textarea>
      <el-button
        @click="() => (convertedValue = JSON.stringify(convert(html)))"
      >
        convert
      </el-button>
      <textarea
        v-model="convertedValue"
        style="width: 400px; height: 300px"
        class="border"
      ></textarea>
    </div>
    <el-button @click="convertAll">Convert all</el-button>
    <el-button @click="getAllImages">Fetch all images</el-button>
    <el-button @click="log">Log</el-button>
    <div class="flex flex-row gap-2">
      <el-input v-model="googleQuery"></el-input>
      <el-button @click="fillUndefinedImageWithQuery"
        >Fill undefined img area</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRestAreaStore } from "../../common/stores/use-rest-area.store";
import restAreaWithImg from "./../../common/config/database/rest-area-db.json";
import RestArea from "../../common/types/RestArea";

const { restAreas } = useRestAreaStore();

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
const googleQuery = ref("aire autoroute");

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

watch(html, (newHtml) => {
  convertedValue.value = JSON.stringify(convert(newHtml));
});

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

const sleep = async (ms: number): Promise<void> => {
  return new Promise<void>((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const fillUndefinedImageWithQuery = async () => {
  const restAreaWithImgList = [
    ...(restAreaWithImg as RestArea[]).filter((a) => a.img !== undefined),
  ];
  const restAreaWithoutImg = (restAreaWithImg as RestArea[]).filter(
    (a) => a.img === undefined
  );
  console.log("rest area without img: ", restAreaWithoutImg.length);
  for (let area of restAreaWithoutImg) {
    fetchImageUrlFromGoogle(`${googleQuery.value} ${area.aire}`, (imageUrl) => {
      restAreaWithImgList.push({
        ...area,
        img: imageUrl.length > 0 ? imageUrl : undefined,
      });
      console.log("progress", restAreaWithImgList);
    });
    await sleep(250);
  }
  console.log(
    "rest area without img after process: ",
    restAreaWithImgList.filter((a) => a.img === undefined).length
  );
};

const log = () => {
  const restAreaWithImgList = restAreaWithImg as RestArea[];
  console.log(
    restAreas.length,
    restAreaWithImgList.length,
    restAreaWithImgList.filter((a) => a.img === undefined).length
  );
  let toTreat = [];
  for (let area of restAreas) {
    if (restAreaWithImgList.find((a) => a.id === area.id) === undefined) {
      const sameNameArea = restAreaWithImgList.find(
        (a) => a.aire === area.aire
      );
      if (sameNameArea !== undefined) {
        restAreaWithImgList.push({
          ...area,
          img: sameNameArea.img,
        });
      } else {
        toTreat.push(area);
      }
    }
  }
  console.log(restAreaWithImgList.length);
  console.log(restAreaWithImgList);
  console.log(toTreat.length);
};

const getAllImages = () => {
  let alreadyTreatedAreas: any[] = [
    ...(restAreaWithImg as RestArea[]).filter(
      (a) => a.img !== undefined && a.img.length > 0
    ),
  ];
  console.log(
    alreadyTreatedAreas.length,
    (restAreaWithImg as RestArea[]).length
  );
  console.log(alreadyTreatedAreas);
  let index = 0;
  const intervalId = setInterval(() => {
    while (
      index < restAreas.length &&
      alreadyTreatedAreas.find(
        (a) => a.id === restAreas[index].id || a.aire === restAreas[index].aire
      )
    ) {
      const sameNameButIdDifferent = alreadyTreatedAreas.find(
        (a) => a.id !== restAreas[index].id && a.aire === restAreas[index].aire
      );
      if (
        sameNameButIdDifferent &&
        !alreadyTreatedAreas.find((a) => a.id === sameNameButIdDifferent.id)
      ) {
        console.log("added duplicate name", {
          ...sameNameButIdDifferent,
          id: restAreas[index],
        });
        alreadyTreatedAreas.push({
          ...sameNameButIdDifferent,
          id: restAreas[index],
        });
      }
      index += 1;
    }
    if (index >= restAreas.length) {
      console.log("fetching finish!");
      clearInterval(intervalId);
      return;
    }
    const target = restAreas[index];
    console.log(`fetching image for `, target);
    fetchImageUrlFromGoogle(`aire de ${target.aire}`, (imageUrl) => {
      alreadyTreatedAreas.push({
        ...target,
        img: imageUrl.length > 0 ? imageUrl : undefined,
      });
      console.log("progress", alreadyTreatedAreas);
    });
    index += 1;
  }, 250);
};

const fetchImageUrlFromGoogle = (
  googleQuery: string,
  callback: (url: string) => void
) => {
  fetch(
    //aire+autoroute+NOM pour ceux qui ont pas encore d'image
    `https://www.google.com/search?q=aire+de+${googleQuery.replace(/ /g, "+")}`
  )
    .then((res) => res.text())
    .then((res) => {
      callback(getImageUrlFromGoogleImageSearch(res));
    });
};

const getImageUrlFromGoogleImageSearch = (html: string): string => {
  const convertContainer = document.createElement("div");
  convertContainer.innerHTML = html;
  const scripts = convertContainer.querySelectorAll("script[nonce]");
  let url = "";
  scripts.forEach((s) => {
    const script = s as HTMLScriptElement;
    if (
      script.textContent!.includes("base64") &&
      script.textContent!.includes("_setImagesSrc") &&
      script.textContent!.includes("dimg_1") &&
      url.length <= 0
    )
      url = script.textContent!.split("'")[1].replace(/\\x3d/g, "");
  });
  return url;
};

const convert = (html: string) => {
  const convertContainer = document.createElement("div");
  const list: any = [];
  convertContainer.innerHTML = html;
  const tables = convertContainer.querySelectorAll(
    "h3+table, h3+.table-wide table"
  );
  const sensH3 = convertContainer.querySelectorAll(
    "h3:has(+table), h3:has(+.table-wide)"
  );
  const autorouteTitle = convertContainer.querySelector(
    ".mw-page-title-main"
  )!.textContent;

  tables.forEach((table, index) => {
    const lines = table.querySelectorAll("tr");
    const sens = sensH3[index].textContent;
    let keys = [...headers.value];
    lines.forEach((line) => {
      const headersDom = line.querySelectorAll("th");
      if (headersDom.length > 0) {
        keys = [];
        headersDom.forEach((h) => {
          keys.push(
            h
              .textContent!.trim()
              .toLowerCase()
              .replace(/ /g, "_")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          );
        });
        return;
      }
      const cols = line.querySelectorAll("td");
      let index = 0;
      let json: any = {
        id: uuidv4(),
        autoroute: autorouteTitle!.split("française ")[1].split(" ")[0],
        sens,
      };
      cols.forEach((col) => {
        const value = col.textContent!.trim();
        json[keys[index]] =
          value === "/" || value.length <= 0 ? undefined : value;
        index += 1;
      });
      if (Object.keys(json).length <= 3) return;
      list.push(json);
    });
  });
  return list;
};
</script>
