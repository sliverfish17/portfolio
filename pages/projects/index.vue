<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-6">Projects</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
      >
        <NuxtLink :to="`/projects/${project.id}`">
          <img
            :src="project.thumbnail"
            alt="Project Thumbnail"
            class="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 class="text-2xl font-semibold mb-2">{{ project.name }}</h2>
          <p class="text-gray-700 dark:text-gray-300">
            {{ project.description }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const projects = ref([]);

onMounted(async () => {
  const res = await fetch('/data/projects.json');
  projects.value = await res.json();
});
</script>
