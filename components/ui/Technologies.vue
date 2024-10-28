<template>
  <section>
    <Loader v-if="isLoading" />
    <ErrorMessage v-else-if="hasError" :message="error || undefined" />
    <div
      v-else
      class="flex w-full flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 relative"
    >
      <div class="flex flex-col overflow-x-hidden gap-12 w-full max-w-full lg:max-w-[70%] md:ml-0">
        <h2
          class="dark:text-orange-dark block lg:hidden text-orange-light font-pangaia text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold whitespace-nowrap text-center"
        >
          Technologies
        </h2>
        <div class="flex flex-col w-full lg:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-28">
          <SkillCard
            v-for="category in skillsData"
            :key="category.title"
            :title="category.title"
            :skills="category.skills"
          />
        </div>
        <div class="w-full overflow-hidden max-w-[calc(100vw-16px)]">
          <TechnologiesCarousel />
        </div>
      </div>
      <h2
        class="dark:text-orange-dark hidden lg:block text-orange-light font-pangaia text-5xl sm:text-7xl font-bold rotate-90 whitespace-nowrap text-center absolute right-[-80px] top-1/2 transform -translate-y-1/2"
      >
        Technologies
      </h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, computed } from 'vue';
import { useContentful } from '~/composables/useContentful';
import Loader from '~/components/ui/Loader.vue';
import ErrorMessage from '~/components/ui/ErrorMessage.vue';

const SkillCard = defineAsyncComponent(() => import('~/components/ui/SkillCard.vue'));
const TechnologiesCarousel = defineAsyncComponent(
  () => import('~/components/ui/TechnologiesCarousel.vue'),
);

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

const isLoading = computed(() => loading.value && !data.value?.length);
const hasError = computed(() => !!error.value);
</script>
