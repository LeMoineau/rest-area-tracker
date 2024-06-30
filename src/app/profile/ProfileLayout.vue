<template>
  <div class="flex flex-row w-full min-h-[--main-body-height]">
    <CustomAside>
      <div class="flex flex-col gap-2 w-full">
        <CustomLink to="/profile">
          <template #prepend-icon><User></User> </template> Votre profile
        </CustomLink>
        <CustomLink to="/profile/settings">
          <template #prepend-icon><Setting></Setting></template> Paramètres
        </CustomLink>
      </div>
    </CustomAside>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import CustomAside from "../../common/components/navigation/CustomAside.vue";
import CustomLink from "../../common/components/navigation/CustomLink.vue";
import { User, Setting } from "@element-plus/icons-vue";

const route = useRoute();
</script>
