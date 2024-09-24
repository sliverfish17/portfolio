<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/projects" class="text-blue-500 hover:underline">← Back to Projects</NuxtLink>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="loading" class="text-center">
      <p>Loading project details...</p>
    </div>

    <!-- Состояние ошибки, если проект не найден -->
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- Отображение информации о проекте, если найден -->
    <div v-else class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <img
        :src="project.thumbnail"
        alt="Thumbnail"
        class="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 class="text-3xl font-bold mb-2">{{ project.name }}</h1>
      <p class="text-gray-700 dark:text-gray-300">{{ project.description }}</p>
      <h2 class="mt-4 text-xl font-semibold">Technologies:</h2>
      <ul class="list-disc list-inside">
        <li v-for="(tech, index) in project.technologies" :key="index">
          {{ tech }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const project = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const projectId = Number(route.params._id);

    if (isNaN(projectId)) {
      error.value = 'Invalid project ID.';
      loading.value = false;
      return;
    }

    const res = await fetch('/data/projects.json');
    if (!res.ok) {
      throw new Error('Failed to fetch project data');
    }

    const projects = await res.json();
    project.value = projects.find((p) => p.id === projectId);

    if (!project.value) {
      error.value = `Project with ID ${projectId} not found.`;
    }
  } catch (err) {
    error.value = 'Error fetching project data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
