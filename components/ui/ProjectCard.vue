<template>
  <div ref="card" class="rounded-xl transition-all duration-300 transform flex flex-col">
    <div ref="imageContainer" class="relative group mb-4 md:mb-6">
      <NuxtImg
        :src="thumbnail"
        alt="Project Thumbnail"
        class="w-full h-64 sm:h-80 object-cover rounded-lg transition-transform shadow-md duration-300 group-hover:blur-sm group-hover:shadow-lg"
        sizes="(max-width: 768px) 100vw, 50vw"
        width="676"
        height="384"
        lazy
      />
      <LinkButton
        v-if="url"
        :url="url"
        icon
        className="absolute max-w-44 max-h-12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-base font-semibold rounded-lg"
      >
        Live demo
      </LinkButton>
    </div>

    <div ref="content" class="flex flex-col xl:flex-row justify-between items-start sm:items-center mb-4">
      <h2 ref="title" class="font-pangaia mb-4 xl:mb-0 font-medium text-left text-2xl sm:text-3xl md:text-4xl dark:text-orange-50 text-text-light">
        {{ name }}
      </h2>
        <ul ref="techList" class="flex flex-wrap xl:place-content-end xl:max-w-80 gap-2">

        <li
          v-for="tech in technologies"
          :key="tech"
          class="rounded-full uppercase border dark:border-text-dark border-text-light px-1.5 md:px-3 md:py-1 dark:text-text-dark text-text-light italic text-xs sm:text-sm md:text-base"
        >
          {{ tech }}
        </li>
      </ul>
    </div>

    <p ref="descriptionEl" class="dark:text-grey text-base md:text-lg text-text-light text-left">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGsap } from '~/composables/useGsap'; 
import LinkButton from '~/components/ui/LinkButton.vue';

interface ProjectCardProps {
  name: string;
  thumbnail: string;
  description: string;
  technologies: string[];
  url?: string;
}

defineProps<ProjectCardProps>();

const card = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);
const descriptionEl = ref<HTMLElement | null>(null);
const techList = ref<HTMLElement | null>(null);
const imageContainer = ref<HTMLElement | null>(null);

useGsap(
  [title, descriptionEl, techList, imageContainer],
  {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  }
);
</script>
