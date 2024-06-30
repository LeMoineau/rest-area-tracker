<template>
  <div class="flex flex-col max-w-[--body-width] w-full">
    <div class="flex flex-col w-full">
      <h2 class="text-left font-semibold border-b pb-4 mb-6">
        Modifier les informations de votre Compte
      </h2>
      <div class="flex flex-col items-start gap-2">
        <div class="flex flex-row">
          <div class="relative h-fit" @click="openPhotoURLMessageBox">
            <el-avatar
              size="large"
              :src="
                newPhotoURL.length > 0
                  ? newPhotoURL
                  : getUser()?.photoURL ?? undefined
              "
            ></el-avatar>
            <div
              class="absolute transition-all h-[56px] cursor-pointer flex flex-col justify-center items-center top-0 left-0 w-full rounded-full hover:bg-gray-500 opacity-0 hover:opacity-90"
            >
              <el-icon size="20px" color="white">
                <UploadFilled></UploadFilled
              ></el-icon>
            </div>
          </div>
          <div class="flex flex-col justify-center items-start">
            <el-input
              style="--el-input-border-color"
              class="max-w-[250px] ml-2"
              v-model="newName"
            ></el-input>
          </div>
        </div>
        <p class="text-sm mt-4">Changer votre mot de passe</p>
        <el-input
          style="--el-input-border-color"
          class="max-w-[250px]"
          showPassword
          v-model="currentPassword"
          placeholder="Mot de passe actuel"
        ></el-input>
        <el-input
          style="--el-input-border-color"
          class="max-w-[250px]"
          showPassword
          v-model="newPassword"
          placeholder="Nouveau mot de passe"
        ></el-input>
        <el-input
          style="--el-input-border-color"
          class="max-w-[250px]"
          showPassword
          v-model="confirmationPassword"
          placeholder="Confirmer nouveau mot de passe"
        ></el-input>
        <div>
          <el-button
            type="success"
            class="mt-6"
            :disabled="!canApplyChanges"
            @click="handleUserChanges"
          >
            Appliquer les modification
          </el-button>
          <el-button class="mt-6" @click="resetChanges">
            Réinitialiser
          </el-button>
        </div>
      </div>
      <h2 class="text-left font-semibold border-b pb-4 mb-6 mt-8">
        Supprimer votre Compte
      </h2>
      <div class="flex flex-col items-start gap-4">
        <p class="text-sm">Attention cette action est irreversible !</p>
        <el-button type="danger">Supprimer votre compte</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useUserDataStore } from "../../../common/stores/use-user-data.store";
import { useUserStore } from "../../../common/stores/use-user.store";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { useUserAuth } from "../../../common/composables/use-user-auth";
import { ProfileChanges } from "../../../common/types/user/ProfileChanges";

const { getUser, setUser } = useUserStore();
const { getCurrentUserData } = useUserDataStore();
const { updateUserProfile } = useUserAuth();

const newName = ref(getUser()?.displayName ?? "");
const newPhotoURL = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const confirmationPassword = ref("");

const canApplyChanges = computed(
  () =>
    newPhotoURL.value.length > 0 ||
    newName.value !== getUser()?.displayName ||
    (currentPassword.value.length > 0 &&
      newPassword.value.length > 0 &&
      confirmationPassword.value === newPassword.value)
);

const openPhotoURLMessageBox = () => {
  ElMessageBox.prompt(
    "Entrer l'url de votre nouveau photo de profil",
    "Changer votre photo de profil",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }
  ).then(({ value }) => {
    newPhotoURL.value = value;
  });
};

const handleUserChanges = async () => {
  let profileChanges: ProfileChanges = {};
  if (newName.value !== getUser()?.displayName) {
    profileChanges.displayName = newName.value;
  }
  if (newPhotoURL.value.length > 0) {
    profileChanges.photoURL = newPhotoURL.value;
  }
  const changes = await updateUserProfile(profileChanges);
  setUser({
    ...getUser()!,
    ...changes,
  });
};

const resetChanges = () => {
  newName.value = getUser()?.displayName ?? "";
  newPhotoURL.value = "";
  currentPassword.value = "";
  newPassword.value = "";
  confirmationPassword.value = "";
};
</script>
