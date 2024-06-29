<template>
  <header
    class="z-10 sticky top-0 left-0 border-b shrink-0 w-full px-2 h-auto bg-white flex-col justify-between items-start md:items-center"
  >
    <div
      class="flex flex-row w-full h-[--header-height-base] justify-between items-center"
    >
      <router-link to="/" @click="resetHeaderSearch">
        <el-text size="large">Rest Area Tracker</el-text></router-link
      >
      <div
        class="absolute bottom-2 left-1/2 w-full max-w-[350px] px-2 -translate-x-1/2 flex flex-row items-center gap-2"
      >
        <el-autocomplete
          v-model="search"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          class="w-full"
          size="large"
          placeholder="Chercher une aire d'autoroute"
          @select="selectSearch"
          @keydown.enter="submitSearch"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <Search></Search>
            </el-icon>
          </template>
        </el-autocomplete>
      </div>
      <el-popover placement="top-start" :width="200" trigger="hover">
        <template #reference>
          <div class="flex flex-row items-center gap-3">
            <el-text size="large">
              {{
                userIsLoggedIn()
                  ? getUser()?.displayName ?? getUser()?.email
                  : "Invité"
              }}
            </el-text>
            <el-avatar></el-avatar>
          </div>
        </template>
        <div class="flex flex-col justify-end items-end gap-2">
          <p class="font-semibold text-md pb-2 mb-2 border-b w-full text-right">
            Mon Profil
          </p>
          <el-button type="danger" @click="logout" v-if="userIsLoggedIn()">
            Se déconnecter </el-button
          ><router-link to="login" v-if="!userIsLoggedIn()">
            <el-button> Se connecter </el-button>
          </router-link>
          <router-link to="register" v-if="!userIsLoggedIn()">
            <el-button type="success"> Créer un compte </el-button>
          </router-link>
        </div>
      </el-popover>
    </div>
    <div class="h-[--header-extra-height-small-device] sm:h-0 w-full"></div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRestAreaStore } from "../../stores/use-rest-area.store";
import { useSettingsStore } from "../../stores/use-settings.store";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/use-user.store";

const MIN_SEARCH_LENGTH = 3;
const search = ref("");
const { getByName } = useRestAreaStore();
const { setHeaderSearch } = useSettingsStore();
const router = useRouter();
const { getUser, userIsLoggedIn, logout } = useUserStore();

const querySearch = (queryString: string, cb: any) => {
  if (queryString.length < MIN_SEARCH_LENGTH) {
    return;
  }

  cb(
    getByName(queryString).map((a) => ({
      value: `${a.aire} (${a.sens})`,
      id: a.id,
    }))
  );
};

const submitSearch = (evt: KeyboardEvent) => {
  if (evt.target === null || !(evt.target instanceof HTMLElement)) return;
  evt.target.blur();
};

watch(search, (newSearch) => {
  setHeaderSearch(newSearch);
});

const selectSearch = (selected: { value: string; id: string }) => {
  console.log(selected);
  router.push({
    name: "rest-area",
    params: { id: selected.id },
  });
};

const resetHeaderSearch = () => {
  search.value = "";
};
</script>
