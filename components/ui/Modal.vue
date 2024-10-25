<template>
  <div
    v-if="isOpen"
    class="fixed z-20 px-4 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    @click="handleOutsideClick"
  >
    <div
      ref="modalContent"
      class="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-sm w-full relative"
      @click.stop
    >
      <button @click="closeModal" class="absolute top-8 right-4 text-gray-700 dark:text-gray-400">
        <img alt="Close" src="/icons/burger-close.svg" />
      </button>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, onUnmounted, ref, nextTick } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close']);
const modalContent = ref<HTMLElement | null>(null);

const closeModal = () => {
  if (modalContent.value) {
    gsap.to(modalContent.value, {
      duration: 0.5,
      opacity: 0,
      scale: 0.9,
      ease: 'power3.inOut',
      onComplete: () => emit('close'),
    });
  }
};

const handleOutsideClick = (e: Event) => {
  const modal = modalContent.value;
  if (modal && !modal.contains(e.target as Node)) {
    closeModal();
  }
};

watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';

      await nextTick();

      if (modalContent.value) {
        gsap.fromTo(
          modalContent.value,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
        );
      }
    } else {
      document.body.style.overflow = '';
    }
  },
);

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>
