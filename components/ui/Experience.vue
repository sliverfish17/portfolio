<template>
  <div class="mb-24">
    <Loader v-if="loading" />
    <span v-else-if="error" class="text-center text-red-500">{{ error }}</span>
    <div id="experience" class="flex w-full justify-between" v-else-if="data">
      <div class="hidden lg:flex flex-col justify-center items-center">
        <h2
          class="dark:text-orange-dark text-orange-light font-pangaia text-7xl font-bold -rotate-90 whitespace-nowrap"
        >
          Experience
        </h2>
      </div>
      <div class="flex flex-col space-y-16">
        <div v-for="item in experience" :key="item.id" class="flex flex-col space-y-6">
          <div class="flex gap-10">
            <div class="text-text-light dark:text-grey dark:opacity-30 text-lg w-24">
              {{ item.year }}
            </div>
            <div class="flex flex-col">
              <h3
                class="text-lg text-left sm:text-lg mb-5 md:text-2xl font-bold text-text-light dark:text-white"
              >
                Frontend Developer at <span class="text-orange-500 italic">{{ item.company }}</span>
              </h3>
              <p class="text-text-light dark:text-grey text-left sm:text-sm md:text-base max-w-3xl">
                {{ item.description }}
              </p>
            </div>
          </div>
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
