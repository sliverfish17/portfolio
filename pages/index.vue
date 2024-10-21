<template>
  <div class="text-center grid place-items-center gap-8 px-4">
    <Heading />
    <Projects />
    <Experience />
    <About />
    <Technologies />
  </div>
</template>

<script lang="ts" setup>
import Heading from '~/components/ui/Heading.vue';
import Projects from '~/components/ui/Projects.vue';
import Experience from '~/components/ui/Experience.vue';
import About from '~/components/ui/About.vue';
import Technologies from '~/components/ui/Technologies.vue';
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { useHead } from '#imports';
import { mainPageSeo } from '~/constants/seoConfig';

useHead(mainPageSeo);

const avatarRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const descriptionRef = ref<HTMLElement | null>(null);
const experienceRef = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.fromTo(
    avatarRef.value,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3 },
  );

  gsap.fromTo(
    titleRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.5 },
  );

  gsap.fromTo(
    descriptionRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.7 },
  );

  gsap.fromTo(
    experienceRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.9 },
  );
});
</script>
