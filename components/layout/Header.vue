<template>
  <header
    ref="header"
    class="fixed top-0 left-0 w-full bg-primary-light dark:bg-primary-dark text-black dark:text-white shadow-lg z-50 p-4 flex justify-between items-center transition-colors duration-300"
  >
    <div class="flex items-center gap-4">
      <div
        ref="logo"
        class="text-2xl font-bold cursor-pointer dark:hover:text-accent-dark hover:text-blue-500 transition duration-300 transform hover:scale-105"
      >
        Portfolio
      </div>
    </div>
    <nav ref="nav" class="flex gap-6 text-lg">
      <NuxtLink
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="hover:text-accent-light dark:hover:text-accent-dark transition duration-300"
        :exact-active-class="'text-accent-light dark:text-accent-dark'"
      >
        {{ link.name }}
      </NuxtLink>
    </nav>
    <button
      ref="colors"
      v-if="mounted"
      @click="toggleTheme"
      class="ml-4 text-2xl hover:text-accent-light dark:hover:text-accent-dark transition duration-300"
    >
      <span v-if="isDarkMode === 'dark'">🌞</span>
      <span v-else>🌙</span>
    </button>
  </header>
</template>

<script setup>
import { useColorMode } from '#imports';
import { computed, ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const colorMode = useColorMode();
const mounted = ref(false);

const links = [
  { name: 'Main', path: '/' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contacts', path: '/contacts' },
];

onMounted(() => {
  mounted.value = true;

  gsap.fromTo(
    header.value,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'bounce' },
  );

  gsap.fromTo(
    logo.value,
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, delay: 0.5, duration: 0.5, ease: 'power2.out' },
  );

  gsap.fromTo(
    nav.value.children,
    { y: -20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
      delay: 0.7,
    },
  );
  if (colors.value) {
    gsap.fromTo(
      colors.value,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, delay: 0.5, duration: 0.5, ease: 'power2.out' },
    );
  }
});

const isDarkMode = computed(() => colorMode.value);

const toggleTheme = () => {
  gsap.to(colors.value, {
    rotation: '+=360',
    duration: 0,
    ease: 'power2.inOut',
    onComplete: () => {
      colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
    },
  });
};

const header = ref(null);
const logo = ref(null);
const nav = ref(null);
const colors = ref(null);
</script>
