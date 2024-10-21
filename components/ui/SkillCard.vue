<template>
  <div
    ref="cardRef"
    class="dark:text-primary-light w-full max-w-md light:text-primary-light rounded-lg transform transition duration-300"
  >
    <div class="transform transition-transform duration-300 w-full">
      <h3
        class="text-2xl font-bold mb-8 font-mono pb-4 border-b border-orange-dark dark:text-orange-dark text-orange-light text-left"
      >
        {{ title }}
      </h3>
      <ul class="text-left space-y-4">
        <li
          v-for="(skill, index) in skills"
          :key="index"
          class="py-1 dark:text-text-dark text-base font-mono text-text-light"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
