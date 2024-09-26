<template>
  <Loader v-if="loading" />
  <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
  <div v-else-if="data">
    <div class="text-center mb-8">
      <h2
        class="text-2xl sm:text-3xl lg:text-4xl mb-4 font-medium font-custom text-text-light dark:text-text-dark"
      >
        My Experience
      </h2>
    </div>
    <div
      class="relative flex flex-col items-start pl-4 sm:pl-10 border-l-2 sm:border-l-4 border-accent-light dark:border-accent-dark space-y-6 sm:space-y-8"
    >
      <div
        v-for="item in experience"
        :key="item.year"
        class="relative flex max-md:flex-wrap items-start sm:items-center space-x-4 sm:space-x-8"
      >
        <div class="justify-center flex-col items-center hidden md:flex">
          <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent-light dark:bg-accent-dark"></div>
          <div class="w-px flex-1 bg-accent-light dark:bg-accent-dark"></div>
        </div>
        <div class="md:grid flex justify-center items-center flex-row">
          <h3
            class="text-base flex sm:text-lg md:w-32 lg:w-36 justify-center md:text-xl max-w-full text-primary-dark laptop:mb-1 mr-2 md:mr-0 dark:text-primary-light"
          >
            ❝ <span class="font-semibold block">{{ item.company }}</span> ❞
          </h3>
          <div
            class="text-sm sm:text-base md:text-lg font-bold text-text-light dark:text-text-dark"
          >
            {{ item.year }}
          </div>
        </div>
        <hr class="h-px w-5 bg-gray-300 dark:bg-gray-600 hidden md:block" />

        <div class="w-full sm:w-auto mt-2 sm:mt-0">
          <p
            class="text-gray-500 dark:text-gray-300 text-left max-w-prose text-xs sm:text-sm md:text-base"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import type { ExperienceFields } from '~/types/experience';
import Loader from '~/components/ui/Loader.vue';
const { data, loading, error, fetchData } = useContentful<ExperienceFields>('experience');

onMounted(fetchData);

const experience = computed(
  () =>
    data.value?.map((item) => ({
      company: item.fields.name,
      year: item.fields.date,
      description: item.fields.description,
      id: item.fields.id,
    })) || [],
);
</script>
