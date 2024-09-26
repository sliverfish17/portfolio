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
    <nav ref="nav" class="hidden md:flex gap-6 text-lg">
      <NuxtLink
        v-for="link in HEADER_LINKS"
        :key="link.path"
        :to="link.path"
        class="hover:text-accent-light dark:hover:text-accent-dark transition duration-300"
        :exact-active-class="'text-accent-light dark:text-accent-dark'"
      >
        {{ link.name }}
      </NuxtLink>
    </nav>
    <div class="flex items-center justify-center">
      <nav
        v-show="isMobileMenuOpen"
        ref="mobileMenu"
        class="fixed top-0 left-0 w-full h-screen bg-primary-light dark:bg-primary-dark flex flex-col items-center justify-center gap-8 z-40"
      >
        <NuxtLink
          v-for="link in HEADER_LINKS"
          :key="link.path"
          :to="link.path"
          class="text-2xl hover:text-accent-light dark:hover:text-accent-dark transition duration-300"
          @click="toggleMobileMenu"
          :exact-active-class="'text-accent-light dark:text-accent-dark underline'"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>
      <button
        ref="colors"
        v-if="mounted"
        @click="toggleTheme"
        class="max-sm:mr-4 md:mr-0 text-2xl hover:text-accent-light dark:hover:text-accent-dark transition duration-300"
      >
        <span v-if="isDarkMode === 'dark'">🌞</span>
        <span v-else>🌙</span>
      </button>
      <button @click="toggleMobileMenu" class="md:hidden text-2xl dark:text-white text-black z-50">
        <span v-if="!isMobileMenuOpen">☰</span>
        <span v-else>✖</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useColorMode } from '#imports';
import { gsap } from 'gsap';
import { HEADER_LINKS } from '~/constants/headerLinks';

const colorMode = useColorMode();

const mounted = ref(false);
const isMobileMenuOpen = ref(false);

const header = ref(null);
const logo = ref(null);
const nav = ref(null);
const colors = ref(null);
const mobileMenu = ref(null);

const toggleMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    gsap.to(mobileMenu.value, {
      y: '-100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        isMobileMenuOpen.value = false;
        document.body.classList.remove('overflow-hidden');
      },
    });
  } else {
    isMobileMenuOpen.value = true;
    document.body.classList.add('overflow-hidden');

    gsap.fromTo(
      mobileMenu.value,
      { y: '-100%', opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
    );
  }
};

const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    gsap.to(mobileMenu.value, {
      y: '-100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        isMobileMenuOpen.value = false;
        document.body.classList.remove('overflow-hidden');
      },
    });
  }
};

onMounted(() => {
  mounted.value = true;
  window.addEventListener('resize', handleResize);
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
    nav.value,
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

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
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
</script>
