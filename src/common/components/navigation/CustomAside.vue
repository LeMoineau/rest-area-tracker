<template>
  <div
    :class="`${hideAside ? 'w-0' : 'w-full'}`"
    class="z-10 absolute bg-white h-full sm:relative border-r sm:h-auto sm:w-full sm:max-w-[--filter-aside-max-width] pb-8"
  >
    <el-button
      style="
        --el-border-radius-base: 0 50px 50px 0px;
        padding-left: 12px;
        padding-right: 12px;
      "
      :class="`${hideAside ? 'opacity-100' : 'opacity-0'}`"
      class="sm:opacity-0 absolute right-0 top-4 translate-x-full rounded-e-full"
      :icon="hideAside ? ArrowRight : ArrowLeft"
      size="large"
      @click="hideAside = !hideAside"
    ></el-button>

    <div
      :class="`${hideAside ? 'hidden' : ''}`"
      class="sm:flex flex-col text-left justify-start items-start w-full overflow-hidden p-4"
    >
      <slot></slot>
      <div class="flex flex-row mt-4">
        <slot name="actions-prepend"></slot>
        <el-button
          class="sm:opacity-0"
          type="primary"
          @click="hideAside = !hideAside"
          >Fermer</el-button
        >
        <slot name="actions-append"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowLeft } from "@element-plus/icons-vue";

const hideAside = defineModel("hideAside");
</script>
