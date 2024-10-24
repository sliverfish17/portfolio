<template>
  <div>
    <UiLoader v-if="isLoadingInitial" />
    <UiErrorMessage v-else-if="hasError" :message="error || undefined" />
    <div v-else-if="isEmpty" class="text-center text-gray-500 text-sm md:text-base">
      No projects available
    </div>
    <div v-else>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id"
          :name="project.name"
          :thumbnail="project.thumbnail"
          :description="project.description"
          :technologies="project.technologies"
          :url="project.url"
          :class="{ 'lg:translate-y-24': index % 2 !== 0 }"
        />
      </div>
      <UiLoader v-if="loading && projects.length" class="text-center mt-6" />
      <div v-if="canLoadMore" class="flex justify-center mt-12 md:mt-36">
        <UiButton
          @click="loadMore"
          :disabled="loading"
          class-name="bg-text-light text-white border-2 hover:bg-text-light border-white"
          size="medium"
        >
          Load More
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useContentful } from '~/composables/useContentful';
const ProjectCard = defineAsyncComponent(() => import('~/components/ui/ProjectCard.vue'));
import type { ContentfulAsset } from '~/types/contentful';

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

onMounted(() => {
  fetchData();
});

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

const isLoadingInitial = computed(() => loading.value && projects.value.length === 0);
const hasError = computed(() => !!error.value);
const isEmpty = computed(() => projects.value.length === 0 && !loading.value && !error.value);
const canLoadMore = computed(() => projects.value.length < totalEntries.value && !loading.value);

const loadMore = async () => {
  await fetchData();
};
</script>
