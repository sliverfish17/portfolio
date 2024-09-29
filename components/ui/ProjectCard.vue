<template>
  <div
    class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex flex-col"
  >
    <NuxtImg
      :src="thumbnail"
      alt="Project Thumbnail"
      class="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 border border-gray-300 dark:border-gray-700"
      sizes="(max-width: 768px) 100vw, 33vw"
      width="600"
      height="400"
      lazy
    />
    <h2 class="text-xl font-semibold mb-2 dark:text-primary-light">{{ name }}</h2>
    <p class="text-gray-700 dark:text-primary-light mb-4">{{ description }}</p>

    <div class="mb-4 flex-grow">
      <h3 class="font-medium text-sm dark:text-primary-light">Technologies:</h3>
      <ul class="flex flex-wrap gap-2 mt-2">
        <li
          v-for="tech in technologies"
          :key="tech"
          class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
        >
          {{ tech }}
        </li>
      </ul>
    </div>

    <div class="mt-auto">
      <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block w-full text-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 bg-accent-light hover:bg-yellow-600 dark:bg-accent-dark text-white dark:hover:bg-yellow-400"
      >
        Visit Project
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface ProjectCardProps {
  name: string;
  thumbnail: string;
  description: string;
  technologies: string[];
  url?: string;
}

defineProps<ProjectCardProps>();
</script>
