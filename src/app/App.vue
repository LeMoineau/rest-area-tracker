<script setup lang="ts">
import GlobalHeader from "../common/components/navigation/GlobalHeader.vue";
</script>

<template>
  <el-container>
    <el-header class="border-b">
      <GlobalHeader></GlobalHeader>
    </el-header>
    <el-main> <router-view></router-view></el-main>
  </el-container>
</template>
