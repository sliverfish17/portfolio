<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold mb-6 text-center dark:text-primary-light">Projects</h1>
    <Loader v-if="loading" />
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else-if="projects.length === 0" class="text-center text-gray-500">
      No projects available
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :name="project.name"
        :thumbnail="project.thumbnail"
        :description="project.description"
        :technologies="project.technologies"
        :url="project.url"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useContentful } from '~/composables/useContentful';
import gsap from 'gsap';
import Loader from '~/components/ui/Loader.vue';
const ProjectCard = defineAsyncComponent(() => import('~/components/ui/ProjectCard.vue'));
import type { ContentfulAsset } from '~/types/contentful';
import { projectsPageSeo } from '~/constants/seoConfig';

interface ProjectFields {
  name: string;
  technologies: string[];
  order: number;
  id: number;
  thumbnail: ContentfulAsset;
  description: string;
  url?: string;
}

const { data, loading, error, fetchData } = useContentful<ProjectFields>('projects');

onMounted(fetchData);
useHead(projectsPageSeo);

const projects = computed(
  () =>
    data.value?.map((item) => ({
      name: item.fields.name,
      id: item.fields.id,
      thumbnail: getContentfulAsset(item.fields.thumbnail),
      description: item.fields.description,
      technologies: item.fields.technologies || [],
      url: item.fields.url,
    })) || [],
);

const projectCardRef = ref<HTMLElement | null>(null);
onMounted(() => {
  gsap.fromTo(
    projectCardRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.3, stagger: 0.2 },
  );
});
</script>
