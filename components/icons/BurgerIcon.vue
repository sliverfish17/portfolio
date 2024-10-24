<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 17H44" :stroke="stroke" stroke-width="4" />
    <path d="M4 31H44" :stroke="stroke" stroke-width="4" />
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  stroke: string;
  size: number;
}>();

const currentStroke = ref(props.stroke);

onMounted(() => {
  currentStroke.value = props.stroke;
});

watch(
  () => props.stroke,
  (newStroke) => {
    currentStroke.value = newStroke;
  },
);
</script>
