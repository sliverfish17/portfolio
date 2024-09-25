<template>
  <div class="skills-page py-16">
    <h2
      class="text-4xl font-bold text-center mb-12 dark:text-primary-light light:text-primary-light"
    >
      Skills
    </h2>
    <div class="flex flex-wrap justify-center gap-8">
      <Card
        v-for="(category, index) in skillsData"
        :key="index"
        :title="category.title"
        :skills="category.skills"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAsyncData, useNuxtApp } from '#imports';
import Card from '@/components/ui/SkillCard';

interface SkillCategory {
  title: string;
  skills: string[];
}

const { $contentfulClient } = useNuxtApp();

const skillsData = ref<SkillCategory[]>([]);

const fetchSkills = async () => {
  try {
    const response = await $contentfulClient.getEntries<SkillCategory>({
      content_type: 'skillsCategory',
      order: 'fields.order',
    });

    if (response.items.length) {
      skillsData.value = response.items.map((item) => ({
        title: item.fields.title,
        skills: item.fields.skills,
      }));
    }
  } catch (error) {
    console.error('Ошибка загрузки данных из Contentful:', error);
  }
};

onMounted(fetchSkills);
</script>
