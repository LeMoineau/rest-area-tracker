<template>
  <router-view :key="route.fullPath"></router-view>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  const marieBirthdayFlag = localStorage.getItem("marie-birthday");
  if (marieBirthdayFlag !== null) return;
  ElMessageBox.alert(
    `<p>Voici un petit site rigolo pour ton anniversaire !</p>
    <p>Je me suis souvenu que pendant un trajet en voiture tu avais dis en rigolant quelque chose du genre : </p>
    <blockquote style="font-style: italic;" class="my-3 mx-2">"tiens, ça pourrait être sympa d'avoir un site qui donne les explications des noms des aires d'autoroutes"</blockquote>
    Et bien le voici ce site ! Bon.. je n'ai pas vraiment trouvé d'anecdotes mais j'ai au moins répertorié toutes les aires d'autoroutes de France !<br>
    <p style="margin-top: 7px">Joyeux anniversaire 🎁 !</p>`,
    "Joyeux anniversaire 🎉 !",
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: "Visiter le site !",
      callback: () => {
        localStorage.setItem("marie-birthday", "true");
      },
    }
  );
});
</script>
