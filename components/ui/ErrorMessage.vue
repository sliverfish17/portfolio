<template>
  <div :class="['text-center', 'text-red-500', customClass]">
    <slot v-if="!message">{{ messageFallback }}</slot>
    <p v-else class="text-sm md:text-base lg:text-lg">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  message?: string;
  customClass?: string;
}>();

const messageFallback = computed(() => {
  return props.message ? null : 'An error occurred';
});
</script>
