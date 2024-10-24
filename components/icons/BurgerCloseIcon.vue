<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 26L25.8562 7.14382" :stroke="stroke" stroke-width="2.66667" />
    <path d="M7 7L25.8562 25.8562" :stroke="stroke" stroke-width="2.66667" />
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
