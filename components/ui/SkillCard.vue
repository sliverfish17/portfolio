<template>
  <div
    ref="cardRef"
    class="bg-white dark:bg-gray-900 dark:text-primary-light light:text-primary-light shadow-2xl rounded-lg p-6 w-80 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
  >
    <div class="inner-card transform transition-transform duration-300">
      <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
      <ul class="space-y-2">
        <li
          v-for="(skill, index) in skills"
          :key="index"
          class="border-b border-gray-400 dark:border-white py-1"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  title: string;
  skills: string[];
}>();

const cardRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (cardRef.value) {
    gsap.from(cardRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from(cardRef.value.querySelectorAll('li'), {
      opacity: 0,
      x: -20,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }
});
</script>
