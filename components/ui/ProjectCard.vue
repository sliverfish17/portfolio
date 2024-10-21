<template>
  <div ref="card" class="p-6 rounded-xl transition-all duration-300 transform flex flex-col">
    <div class="relative group">
      <NuxtImg
        :src="thumbnail"
        alt="Project Thumbnail"
        class="w-full h-96 object-cover rounded-lg transition-transform shadow-md duration-300 group-hover:blur-sm group-hover:shadow-lg"
        sizes="(max-width: 768px) 100vw, 50vw"
        width="770"
        height="480"
        lazy
      />
      <LinkButton
        v-if="url"
        :url="url"
        icon
        className="absolute max-w-44 max-h-12 left-1/2 top-1/2 -translate-x-1/2 ease-in -translate-y-1/2 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-base font-semibold rounded-lg"
      >
        Live demo
      </LinkButton>
    </div>
    <div class="flex mb-4 mt-7 justify-between items-center">
      <h2
        ref="title"
        class="font-pangaia font-medium text-left text-4xl dark:text-orange-50 text-text-light"
      >
        {{ name }}
      </h2>
      <ul ref="techList" class="flex flex-wrap place-content-end max-w-80 gap-2">
        <li
          v-for="tech in technologies"
          :key="tech"
          class="rounded-full uppercase border dark:border-text-dark border-text-light px-3 dark:text-text-dark text-text-light italic"
        >
          {{ tech }}
        </li>
      </ul>
    </div>
    <p ref="descriptionEl" class="dark:text-grey text-lg text-text-light text-left">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import LinkButton from '~/components/ui/LinkButton.vue';

interface ProjectCardProps {
  name: string;
  thumbnail: string;
  description: string;
  technologies: string[];
  url?: string;
}

defineProps<ProjectCardProps>();

const title = ref<HTMLElement | null>(null);
const descriptionEl = ref<HTMLElement | null>(null);
const techTitle = ref<HTMLElement | null>(null);
const techList = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.from(title.value, {
    opacity: 0,
    y: -20,
    duration: 1,
    ease: 'power2.out',
  });

  gsap.from(descriptionEl.value, {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power2.out',
    delay: 0.2,
  });

  gsap.from(techTitle.value, {
    opacity: 0,
    x: -20,
    duration: 1,
    ease: 'power2.out',
    delay: 0.4,
  });

  gsap.from(techList.value, {
    opacity: 0,
    y: 10,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.6,
  });
});
</script>
