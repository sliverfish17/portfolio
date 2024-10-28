<template>
  <section
    ref="sectionRef"
    class="flex flex-col lg:flex-row w-full mx-auto justify-between items-center gap-10 lg:gap-24"
  >
    <div ref="contentRef" class="w-full lg:w-1/2 text-left">
      <h2
        ref="headingRef"
        class="font-pangaia font-medium text-4xl sm:text-5xl mb-6 dark:text-text-dark text-text-light"
      >
        A little about me
      </h2>
      <p
        ref="paragraphRef"
        class="text-sm md:text-base lg:text-lg dark:text-text-dark text-text-light"
      >
        I'm a Frontend Developer with over 4 years of experience, specializing in crafting
        user-centric and intuitive web experiences that bridge the gap between user needs and
        business goals. A strong collaborator with a proven track record of reliability, I
        continually enhance my skills through ongoing learning, staying updated on the latest
        frontend development technologies and best practices.
      </p>
    </div>
    <div ref="imageRef" class="w-full lg:w-1/2 flex justify-center">
      <img
        width="448"
        height="597"
        src="/images/avatar.jpg"
        alt="Avatar Image"
        class="w-full max-w-sm lg:max-w-md h-auto object-cover rounded-xl transition-transform shadow-md duration-300"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';
import { useIntersectionObserver } from '~/composables/useIntersectionObserver';

const sectionRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const paragraphRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);

useIntersectionObserver([sectionRef], () => {
  if (headingRef.value) {
    gsap.from(headingRef.value, {
      opacity: 0,
      x: -50,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  if (paragraphRef.value) {
    gsap.from(paragraphRef.value, {
      opacity: 0,
      x: -50,
      delay: 0.2,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  if (imageRef.value) {
    gsap.from(imageRef.value, {
      opacity: 0,
      x: 50,
      scale: 0.95,
      duration: 0.6,
      ease: 'power3.out',
    });
  }
});
</script>
