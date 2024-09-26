<template>
  <div>
    <h2
      class="text-4xl font-bold text-center mb-12 dark:text-primary-light light:text-primary-light"
    >
      Skills
    </h2>
    <Loader v-if="loading" />
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="flex flex-wrap justify-center gap-8">
      <SkillCard
        v-for="category in skillsData"
        :key="category.title"
        :title="category.title"
        :skills="category.skills"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkillCard from '~/components/ui/SkillCard.vue';
import { useContentful } from '~/composables/useContentful';
import Loader from '~/components/ui/Loader.vue';

interface SkillCategoryFields {
  title: string;
  skills: string[];
  order: number;
}

const { data, loading, error, fetchData } = useContentful<SkillCategoryFields>('skillsCategory');

onMounted(fetchData);

const skillsData = computed(
  () =>
    data.value?.map((item) => ({
      title: item.fields.title,
      skills: item.fields.skills,
    })) || [],
);
</script>
