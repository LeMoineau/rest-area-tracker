<template>
  <div class="flex flex-row w-full min-h-[--main-body-height] h-full">
    <CustomAside>
      <CustomLink to="/profile">
        <template #prepend-icon><User></User> </template> Votre profile
      </CustomLink>
      <CustomLink to="/profile/settings">
        <template #prepend-icon><Setting></Setting></template> Paramètres
      </CustomLink>
    </CustomAside>
    <div class="flex flex-col items-center w-full gap-3 px-8 py-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import CustomAside from "../../common/components/navigation/CustomAside.vue";
import CustomLink from "../../common/components/navigation/CustomLink.vue";
import { User, Setting } from "@element-plus/icons-vue";

const route = useRoute();
</script>
