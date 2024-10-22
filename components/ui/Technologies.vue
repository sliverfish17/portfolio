<template>
  <div class="w-full mb-24">
    <Loader v-if="loading" />
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="flex w-full">
      <div class="flex flex-col gap-24">
        <div class="flex gap-28">
          <SkillCard
            v-for="category in skillsData"
            :key="category.title"
            :title="category.title"
            :skills="category.skills"
          />
        </div>
        <TechnologiesCarousel />
      </div>
      <h2
        class="dark:text-orange-dark -ml-[52px] text-orange-light font-pangaia text-7xl font-bold rotate-90 whitespace-nowrap"
      >
        Technologies
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const SkillCard = defineAsyncComponent(() => import('~/components/ui/SkillCard.vue'));
import { useContentful } from '~/composables/useContentful';
import Loader from '~/components/ui/Loader.vue';
import { skillsPageSeo } from '~/constants/seoConfig';
import TechnologiesCarousel from './TechnologiesCarousel.vue';

interface SkillCategoryFields {
  title: string;
  skills: string[];
  order: number;
}

const { data, loading, error, fetchData } = useContentful<SkillCategoryFields>('skillsCategory');

onMounted(fetchData);
useHead(skillsPageSeo);

const skillsData = computed(
  () =>
    data.value?.map((item) => ({
      title: item.fields.title,
      skills: item.fields.skills,
    })) || [],
);
</script>
