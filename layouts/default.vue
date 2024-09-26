<template>
  <div class="min-h-screen pt-20 flex flex-col dark:bg-primary-dark">
    <Header />
    <div class="flex-grow container mx-auto p-4">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/layout/Header.vue';
import Footer from '~/components/layout/Footer.vue';
</script>
