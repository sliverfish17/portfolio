<template>
  <div class="text-center grid place-items-center gap-8">
    <NuxtImg
      ref="avatarRef"
      src="/images/avatar.jpg"
      alt="Profile Avatar"
      class="rounded-full max-w-64"
      width="256"
      height="256"
      format="webp"
      sizes="(max-width: 640px) 100vw, 256px"
    />
    <h1 ref="titleRef" class="text-4xl dark:text-primary-light light:text-primary-light opacity-0">
      Hello, my name is Oleksii!
    </h1>
    <p
      ref="descriptionRef"
      class="dark:text-primary-light max-w-80 text-lg light:text-primary-light opacity-0"
    >
      Front-end developer who loves crafting delightful and intuitive web experiences! 🔱
    </p>
    <div ref="experienceRef">
      <Experience />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Experience from '~/components/ui/Experience.vue';
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { useHead } from '#imports';

useHead({
  title: 'Main Page - Oleksii Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Front-end developer who loves crafting delightful and intuitive web experiences!',
    },
    { property: 'og:title', content: 'Oleksii Portfolio - Front-end Developer' },
    {
      property: 'og:description',
      content: 'Crafting delightful and intuitive web experiences as a Front-end Developer.',
    },
    { property: 'og:image', content: '/images/avatar.jpg' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:title', content: 'Oleksii Portfolio - Front-end Developer' },
    {
      name: 'twitter:description',
      content: 'Crafting delightful and intuitive web experiences as a Front-end Developer.',
    },
    { name: 'twitter:image', content: '/images/avatar.jpg' },
  ],
});

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

<style></style>
