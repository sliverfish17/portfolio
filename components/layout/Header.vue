<template>
  <header
    class="fixed top-0 left-0 w-full bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark py-6 z-50"
  >
    <div class="container px-4 mx-auto flex items-center justify-between">
      <button v-if="isClient" @click="toggleTheme" class="flex items-center">
        <div
          :class="[
            'w-[50px] h-[50px] flex items-center justify-center rounded-full',
            colorMode.value === 'dark' ? 'bg-lamp-dark' : 'bg-lamp-light',
          ]"
        >
          <img
            :src="colorMode.value === 'dark' ? '/icons/lamp-on.svg' : '/icons/lamp-off.svg'"
            alt="Theme Toggle Icon"
            class="w-8 h-8"
          />
        </div>
      </button>

      <nav class="hidden md:flex space-x-10 text-sm">
        <a
          v-for="link in HEADER_LINKS"
          :key="link.path"
          @click="scrollToSection(link.path)"
          class="text-xl text-text-light dark:text-text-dark"
        >
          {{ link.name }}
        </a>
      </nav>
      <UiLinkButton :url="CV_DOWNLOAD_LINK" icon size="medium">Resume</UiLinkButton>
      <button v-if="isClient" @click="toggleMobileMenu" class="flex md:hidden">
        <BurgerIcon :stroke="clientStrokeColor" :size="32" />
      </button>
    </div>
    <div
      ref="mobileMenu"
      class="fixed top-0 left-0 w-full h-screen bg-primary-light dark:bg-primary-dark flex flex-col items-center justify-center gap-8 z-40"
      v-show="isMobileMenuVisible"
    >
      <button v-if="isClient" @click="toggleMobileMenu" class="absolute top-6 right-6 flex items-center">
        <BurgerCloseIcon :stroke="clientStrokeColor" :size="32" />
      </button>
      <nav class="flex flex-col items-center justify-center gap-8">
        <a
          v-for="link in HEADER_LINKS"
          :key="link.path"
          @click="scrollToSection(link.path)"
          class="text-2xl hover:text-accent-light dark:hover:text-accent-dark transition duration-300"
        >
          {{ link.name }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import gsap from 'gsap';
import { useColorMode } from '#imports';
import { HEADER_LINKS } from '~/constants/headerLinks';
import BurgerIcon from '~/components/icons/BurgerIcon.vue';
import BurgerCloseIcon from '~/components/icons/BurgerCloseIcon.vue';

const colorMode = useColorMode();
const isMobileMenuOpen = ref(false);
const isMobileMenuVisible = ref(false);
const mobileMenu = ref(null);
const isClient = ref(false);

const CV_DOWNLOAD_LINK =
  'https://drive.google.com/uc?export=download&id=1LGf1SMad5VYQHGhuFSVtCs_Ym9qcIV6X';

const clientStrokeColor = computed(() => {
  if (!isClient.value) {
    return '#000000'; 
  }
  return colorMode.value === 'dark' ? '#FFF' : '#000000';
});

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    isMobileMenuVisible.value = true;
  }
  document.body.classList.toggle('overflow-hidden', isMobileMenuOpen.value);
};

const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
    document.body.classList.remove('overflow-hidden');
  }
};

const scrollToSection = (targetId: string) => {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const offset = 120;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    if (isMobileMenuOpen.value) {
      toggleMobileMenu();
    }
  }
};

watch(isMobileMenuOpen, (newVal) => {
  if (newVal && mobileMenu.value) {
    gsap.fromTo(
      mobileMenu.value,
      { y: '-100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        onStart: () => {
          isMobileMenuVisible.value = true;
        },
      },
    );
  } else if (mobileMenu.value) {
    gsap.to(mobileMenu.value, {
      y: '-100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        isMobileMenuVisible.value = false;
      },
    });
  }
});

onMounted(() => {
  isClient.value = true;

  if (!colorMode.preference) {
    colorMode.preference = 'dark';
  }

  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
