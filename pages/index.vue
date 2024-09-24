<template>
  <title>Main Page</title>
  <meta />
  <div class="text-center grid place-items-center gap-8">
    <NuxtImg
      src="/images/avatar.jpg"
      alt="Profile Avatar"
      class="rounded-full max-w-64"
      width="256"
      height="256"
      format="webp"
      sizes="(max-width: 640px) 100vw, 256px"
    />
    <h1 class="text-4xl dark:text-primary-light light:text-primary-light">
      Hello, my name is Oleksii!
    </h1>
    <p class="dark:text-primary-light max-w-80 text-lg light:text-primary-light">
      Front-end developer who loves crafting delightful and intuitive web experiences! 🔱
    </p>
    <Experience />
  </div>
</template>

<script lang="ts" setup>
import Experience from '~/components/ui/Experience.vue';
</script>

<style></style>
