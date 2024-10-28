<template>
  <section class="grid place-items-center">
    <h1
      ref="heading"
      class="font-pangaia text-center dark:text-orange-dark text-orange-light font-medium text-5xl sm:text-7xl lg:text-9xl"
    >
      Oleksii Kolotenko
    </h1>
    <p
      ref="paragraph"
      class="text-center max-w-2xl mb-8 md:mb-14 text-lg sm:text-xl md:text-2xl mx-auto dark:text-text-dark text-text-light"
    >
      Front-end developer who loves crafting delightful and intuitive web experiences!
    </p>
    <UiButton size="large" ref="button" @click="openModal">Let's discuss!</UiButton>

    <UiModal :isOpen="isModalOpen" @close="isModalOpen = false">
      <UiSocialModalContent />
    </UiModal>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const heading = ref(null);
const paragraph = ref(null);
const button = ref(null);
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

onMounted(() => {
  gsap.from(heading.value, {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
  });

  gsap.from(paragraph.value, {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.5,
    ease: 'power3.out',
  });

  gsap.from(button.value, {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1,
    ease: 'power3.out',
  });
});
</script>
