<template>
  <el-tag size="small" :type="tag === 'Oui' ? 'success' : 'danger'">
    {{ tag }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { value } = defineProps<{ value: string }>();

const tag = computed(() =>
  value.toLowerCase().includes("oui") ? "Oui" : "Non"
);
</script>
