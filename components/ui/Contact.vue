<template>
  <div
    id="contact"
    class="w-full p-10 sm:p-16 md:p-20 dark:bg-orange-dark rounded-2xl bg-orange-light"
  >
    <h2
      class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 md:mb-12 lg:mb-16 text-center font-pangaia font-medium"
    >
      Let’s code the future together!
    </h2>
    <UiButton
      size="medium"
      class-name="flex mx-auto items-center justify-center duration-300 !bg-black text-white text-sm sm:text-base lg:text-lg font-semibold rounded-full px-6 py-3 md:px-8 md:py-4"
      @click="openModal"
    >
      Contact me
    </UiButton>
    <UiModal :isOpen="isModalOpen" @close="isModalOpen = false">
      <UiSocialModalContent />
    </UiModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
</script>
