<template>
  <div>
    <Loader v-if="isLoading" />
    <ErrorMessage v-else-if="hasError" :message="error || undefined" />
    <div v-else class="flex w-full">
      <div class="flex flex-col gap-24">
        <div class="flex flex-col gap-28">
          <SkillCard
            v-for="category in skillsData"
            :key="category.title"
            :title="category.title"
            :skills="category.skills"
          />
        </div>
        <TechnologiesCarousel />
      </div>
      <h2 class="dark:text-orange-dark -ml-[52px] text-orange-light font-pangaia text-5xl sm:text-7xl md:text-7xl lg:text-7xl font-bold rotate-90 whitespace-nowrap">
        Technologies
      </h2>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineAsyncComponent, onMounted, computed } from 'vue';
import { useContentful } from '~/composables/useContentful';
import Loader from '~/components/ui/Loader.vue';
import ErrorMessage from '~/components/ui/ErrorMessage.vue';

const SkillCard = defineAsyncComponent(() => import('~/components/ui/SkillCard.vue'));
const TechnologiesCarousel = defineAsyncComponent(() => import('~/components/ui/TechnologiesCarousel.vue'));

interface SkillCategoryFields {
  title: string;
  skills: string[];
  order: number;
}

const { data, loading, error, fetchData } = useContentful<SkillCategoryFields>('skillsCategory');

onMounted(fetchData);

const skillsData = computed(() =>
  data.value?.map((item) => ({
    title: item.fields.title,
    skills: item.fields.skills,
  })) || []
);

const isLoading = computed(() => loading.value && !data.value?.length);
const hasError = computed(() => !!error.value);
</script>
