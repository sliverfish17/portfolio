<template>
  <div class="experience-ladder py-8">
    <div class="text-center mb-8">
      <h2 class="text-3xl mb-4 font-medium font-custom text-text-light dark:text-text-dark">
        My Experience
      </h2>
    </div>
    <div
      class="relative flex flex-col items-start pl-10 border-l-4 border-accent-light dark:border-accent-dark space-y-8"
    >
      <div v-for="item in experience" :key="item.year" class="relative flex items-center space-x-4">
        <div class="flex justify-center flex-col items-center">
          <div class="w-3 h-3 rounded-full bg-accent-light dark:bg-accent-dark"></div>
          <div class="w-px flex-1 bg-accent-light dark:bg-accent-dark"></div>
        </div>
        <div class="grid">
          <h3 class="text-xl text-primary-dark mb-2 dark:text-primary-light">
            ❝ <span class="font-semibold">{{ item.company }}</span> ❞
          </h3>
          <div class="text-lg font-bold min-w-32 text-text-light dark:text-text-dark">
            {{ item.year }}
          </div>
        </div>
        <hr class="h-px w-5 bg-gray-300 dark:bg-gray-600" />

        <div>
          <p class="text-gray-500 dark:text-gray-300 text-left max-w-prose">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const experience = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch('/data/experience.json');
    if (!res.ok) {
      throw new Error('Failed to fetch experience data');
    }

    experience.value = await res.json();
  } catch (err) {
    error.value = 'Error fetching experience data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
