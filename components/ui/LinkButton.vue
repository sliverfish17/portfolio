<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="inline-block">
    <Button :size="size" :icon="icon" :className="className">
      <slot></slot>
    </Button>
  </a>
</template>

<script lang="ts" setup>
import Button from './Button.vue';

interface LinkButtonProps {
  url: string;
  size?: 'medium' | 'large';
  icon?: boolean;
  className?: string;
}

const props = defineProps<LinkButtonProps>();
</script>
