<template>
  <div class="py-8 overflow-hidden relative">
    <span
      class="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-primary-light dark:from-primary-dark to-transparent z-10 pointer-events-none"
    />
    <div ref="tickerContainer" class="ticker-container max-w-5xl flex items-center space-x-24">
      <div
        v-for="(tech, index) in repeatedTechnologies"
        :key="index"
        class="technology-icon flex flex-col items-center text-white shrink-0"
      >
        <img width="64" height="64" :src="tech.icon" :alt="tech.name" class="h-16 w-16 mb-2" />
        <span class="text-lg text-center font-semibold">{{ tech.name }}</span>
      </div>
    </div>
    <span
      class="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-primary-light dark:from-primary-dark to-transparent z-10 pointer-events-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

const technologies = [
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'Next', icon: '/icons/next.svg' },
  { name: 'Vue', icon: '/icons/vue.svg' },
  { name: 'Nuxt', icon: '/icons/nuxt.svg' },
];

const repeatedTechnologies = [...technologies, ...technologies, ...technologies];

const tickerContainer = ref(null);

onMounted(async () => {
  await nextTick();

  const container = tickerContainer.value;

  gsap.to(container, {
    xPercent: 100,
    repeat: -1,
    duration: 30,
    ease: 'none',
    modifiers: {
      xPercent: gsap.utils.wrap(-100, 0),
    },
  });
});
</script>
