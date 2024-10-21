<template>
  <div class="container mx-auto mb-24">
    <Loader v-if="loading && !projects.length" />
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else-if="projects.length === 0" class="text-center text-gray-500">
      No projects available
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-14">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :name="project.name"
        :thumbnail="project.thumbnail"
        :description="project.description"
        :technologies="project.technologies"
        :url="project.url"
        :class="{
          'md:translate-y-24': index % 2 !== 0,
        }"
      />
    </div>
    <div v-if="loading && projects.length" class="text-center mt-6">
      <Loader />
    </div>
    <div v-if="projects.length < totalEntries && !loading" class="flex justify-center mt-32">
      <Button
        @click="loadMore"
        :disabled="loading"
        class-name="bg-text-light text-white border-2 hover:bg-text-light border-white"
        size="medium"
      >
        Load More
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useContentful } from '~/composables/useContentful';
import Loader from '~/components/ui/Loader.vue';
const ProjectCard = defineAsyncComponent(() => import('~/components/ui/ProjectCard.vue'));
import type { ContentfulAsset } from '~/types/contentful';
import Button from './Button.vue';

interface ProjectFields {
  name: string;
  technologies: string[];
  order: number;
  id: number;
  thumbnail: ContentfulAsset;
  description: string;
  url?: string;
}

const { data, loading, error, fetchData, totalEntries } = useContentful<ProjectFields>('projects');

onMounted(fetchData);

const projects = computed(() => {
  return (
    data.value?.map((item) => ({
      name: item.fields.name,
      id: item.fields.id,
      thumbnail: getContentfulAsset(item.fields.thumbnail),
      description: item.fields.description,
      technologies: item.fields.technologies || [],
      url: item.fields.url,
    })) || []
  );
});

const loadMore = () => {
  fetchData();
};
</script>
