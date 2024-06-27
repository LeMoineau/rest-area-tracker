<script setup lang="ts">
import GlobalHeader from "../common/components/navigation/GlobalHeader.vue";
</script>

<template>
  <el-container>
    <el-header class="border-b">
      <GlobalHeader></GlobalHeader>
    </el-header>
    <el-main>
      <div class="flex flex-row justify-center items-center w-full">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>
