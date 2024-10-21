<template>
  <header
    class="fixed top-0 left-0 w-full bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark py-6 z-50"
  >
    <div class="container mx-auto flex items-center justify-between">
      <button @click="toggleTheme" class="flex items-center">
        <div
          :class="[
            'w-[50px] h-[50px] flex items-center justify-center rounded-full',
            colorMode === 'dark' ? 'bg-lamp-dark' : 'bg-lamp-light',
          ]"
        >
          <img
            :src="colorMode === 'dark' ? '/icons/lamp-on.svg' : '/icons/lamp-off.svg'"
            alt="Theme Toggle Icon"
            class="w-8 h-8"
          />
        </div>
      </button>

      <nav class="hidden md:flex space-x-10 text-sm">
        <a
          v-for="link in HEADER_LINKS"
          :key="link.path"
          :href="link.path"
          class="text-xl text-text-light dark:text-text-dark"
        >
          {{ link.name }}
        </a>
      </nav>

      <div>
        <button
          class="hidden md:flex items-center gap-3 bg-black text-white py-2 px-4 rounded-full hover:bg-accent-dark"
        >
          Resume
          <img src="/icons/arrow-link.svg" alt="Upload icon" class="w-5 h-5" />
        </button>
      </div>

      <button @click="toggleMobileMenu" class="flex md:hidden">
        <img
          :src="isMobileMenuOpen ? '/icons/burger-close.svg' : '/icons/burger.svg'"
          alt="Menu Icon"
          class="w-8 h-8"
        />
      </button>
    </div>

    <div
      v-show="isMobileMenuOpen"
      ref="mobileMenu"
      class="fixed top-0 left-0 w-full h-screen bg-primary-light dark:bg-primary-dark flex flex-col items-center justify-center gap-8 z-40 transition-transform duration-500"
      :class="isMobileMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'"
    >
      <nav class="flex flex-col items-center justify-center gap-8">
        <a
          v-for="link in HEADER_LINKS"
          :key="link.path"
          :href="link.path"
          class="text-2xl hover:text-accent-light dark:hover:text-accent-dark transition duration-300"
          @click="toggleMobileMenu"
        >
          {{ link.name }}
        </a>
        <button
          class="flex items-center gap-3 bg-black text-white py-2 px-4 rounded-full hover:bg-accent-dark"
        >
          Resume
          <img src="/icons/arrow-link.svg" alt="Upload icon" class="w-5 h-5" />
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useColorMode } from '#imports';
import { HEADER_LINKS } from '~/constants/headerLinks';

const colorMode = useColorMode();
const isMobileMenuOpen = ref(false);
const mobileMenu = ref(null);

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.classList.toggle('overflow-hidden', isMobileMenuOpen.value);
};

const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
    document.body.classList.remove('overflow-hidden');
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
