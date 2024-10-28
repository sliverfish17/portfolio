<template>
  <button
    :class="[
      size,
      'flex items-center justify-center font-bold rounded-full focus:outline-none',
      'transition-all ease-in transform-gpu duration-300',
      'text-text-dark bg-orange-light hover:bg-orange-50',
      size === 'large' ? 'px-10 py-4 text-lg sm:text-xl' : 'px-7 py-3 text-base sm:text-lg',
      className,
    ]"
    @click="handleClick"
  >
    <span> <slot></slot></span>
    <template v-if="icon">
      <img width="20" height="20" class="w-5 ml-2" alt="Link" src="/icons/arrow-link.svg" />
    </template>
  </button>
</template>

<script lang="ts" setup>
interface ButtonProps {
  size?: 'medium' | 'large';
  icon?: boolean;
  fullWidth?: boolean;
  className?: string;
}

defineProps<ButtonProps>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>
