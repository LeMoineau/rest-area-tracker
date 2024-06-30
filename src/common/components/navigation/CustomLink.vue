<template>
  <router-link
    :to="to"
    class="flex flex-row items-center gap-3 w-full rounded-lg px-4 py-2 text-left transition-all"
    :class="`${
      !dontUseActive && active ? 'bg-gray-100 text-blue-500' : 'bg-white'
    } ${(!active || dontUseActive) && 'hover:bg-gray-50'}`"
  >
    <el-icon v-if="!!slots['prepend-icon']">
      <slot name="prepend-icon"></slot>
    </el-icon>
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useRoute } from "vue-router";

const { dontUseActive, to } = defineProps<{
  dontUseActive?: boolean;
  to: string;
}>();

const slots = useSlots();
const route = useRoute();

const active = computed(() => route.path === to);
</script>
