<script setup lang="ts">
import GlobalHeader from "../common/components/navigation/GlobalHeader.vue";
</script>

<template>
  <el-container class="flex-wrap">
    <GlobalHeader></GlobalHeader>
    <el-main style="--el-main-padding: 0px">
      <div class="flex flex-row justify-center items-center w-full">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>
