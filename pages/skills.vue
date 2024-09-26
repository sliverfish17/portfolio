<template>
  <div class="skills-page py-16">
    <h2
      class="text-4xl font-bold text-center mb-12 dark:text-primary-light light:text-primary-light"
    >
      Skills
    </h2>
    <div class="flex flex-wrap justify-center gap-8">
      <SkillCard
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
import { useNuxtApp } from '#imports';
import SkillCard from '../components/ui/SkillCard.vue';

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
    console.error(error);
  }
};

onMounted(fetchSkills);
</script>
