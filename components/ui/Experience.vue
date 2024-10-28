<template>
  <section>
    <ExperienceSkeleton v-if="loading" />
    <Loader v-if="loading" />
    <span v-else-if="error" class="text-center text-red-500 text-sm md:text-base lg:text-lg">{{
      error
    }}</span>
    <div id="experience" class="flex flex-col lg:flex-row w-full justify-between" v-else-if="data">
      <div class="flex flex-col justify-center items-center">
        <h2
          class="dark:text-orange-dark max-w-60 text-orange-light font-pangaia mb-12 lg:mb-0 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold lg:-rotate-90 whitespace-nowrap"
        >
          Experience
        </h2>
      </div>
      <div class="flex flex-col space-y-16">
        <div v-for="item in experience" :key="item.id" class="flex flex-col space-y-6">
          <div class="flex gap-10">
            <p
              class="whitespace-nowrap max-w-8 lg:max-w-none w-auto flex items-center text-text-light -rotate-90 lg:rotate-0 xl:items-start dark:text-grey dark:opacity-30 text-sm md:text-lg md:w-24"
            >
              {{ item.year }}
            </p>
            <div class="flex flex-col">
              <h3
                class="text-left mb-5 text-lg sm:text-xl md:text-2xl font-bold text-text-light dark:text-white"
              >
                Frontend Developer at <span class="text-orange-500 italic">{{ item.company }}</span>
              </h3>
              <p class="text-left text-text-light dark:text-grey text-sm md:text-base max-w-3xl">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
