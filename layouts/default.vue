<template>
  <div class="min-h-screen pt-20 px-4 dark:bg-primary-dark flex flex-col">
    <Header />
    <div class="container mx-auto">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/layout/Header.vue';
import Footer from '~/components/layout/Footer.vue';
</script>
