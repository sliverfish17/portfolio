<template>
  <div class="py-8 overflow-hidden relative">
    <span
      class="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-primary-light dark:from-primary-dark to-transparent z-10 pointer-events-none"
    ></span>
    <div class="relative overflow-hidden">
      <div
        ref="marqueeRef"
        class="will-change-transform flex items-center space-x-8 sm:space-x-12 md:space-x-14 xl:space-x-24"
      >
        <div
          v-for="(tech, index) in duplicatedTechnologies"
          :key="index"
          class="technology-icon flex justify-center flex-col items-center text-white shrink-0"
        >
          <div class="bg-black p-3 lg:p-4 rounded-full mb-2">
            <img
              width="48"
              height="48"
              :src="tech.icon"
              :alt="tech.name"
              class="h-7 w-7 lg:h-12 lg:w-12"
            />
          </div>
          <span
            class="text-lg font-pangaia dark:text-text-dark text-text-light text-center font-semibold"
            >{{ tech.name }}</span
          >
        </div>
      </div>
    </div>
    <span
      class="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-primary-light dark:from-primary-dark to-transparent z-10 pointer-events-none"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const technologies = [
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'Next', icon: '/icons/next.svg' },
  { name: 'Vue', icon: '/icons/vue.svg' },
  { name: 'Nuxt', icon: '/icons/nuxt.svg' },
];

const duplicatedTechnologies = [...technologies, ...technologies];

const marqueeRef = ref(null);

onMounted(() => {
  gsap.fromTo(
    marqueeRef.value,
    { x: 0 },
    {
      x: '-50%',
      duration: 20,
      ease: 'none',
      repeat: -1,
    },
  );
});
</script>
