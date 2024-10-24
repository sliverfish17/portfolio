<template>
  <footer class="w-full py-8 bg-primary-light dark:bg-primary-dark text-black dark:text-white">
    <div class="max-w-screen-xl mx-auto px-4 text-center space-y-8">
      <div class="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
        <p
          class="font-medium text-2xl md:text-4xl dark:text-text-dark text-text-light font-pangaia"
        >
          You can also find me here
        </p>
        <img class="hidden md:block" src="/icons/arrow.svg" />
        <div class="flex items-center font-pangaia justify-center gap-12">
          <a
            v-for="link in contactLinks"
            :key="link.link"
            :href="link.link"
            target="_blank"
            rel="noopener noreferrer"
            class="w-12 h-12 bg-primary-light dark:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <img :src="link.iconUrl" :alt="link.name" class="w-6 h-6" />
          </a>
        </div>
      </div>
      <hr class="w-full mx-auto border-text-dark dark:border-primary-light" />
      <p class="text-base dark:text-text-dark text-text-light">
        Designed by
        <a
          href="https://sndx.com"
          target="_blank"
          class="text-orange-light dark:text-orange-dark underline"
        >
          SNDX
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#imports';
import type { ContactResponse, MappedContactLink } from '~/types/contacts';

const contactLinks = ref<MappedContactLink[]>([]);

const { $contentfulClient } = useNuxtApp();

const fetchContacts = async () => {
  try {
    const response: ContactResponse = await $contentfulClient.getEntries({
      content_type: 'contacts',
    });
    if (response.items.length) {
      contactLinks.value = response.items.map((item) => ({
        name: item.fields.name,
        link: item.fields.link,
        iconUrl: getContentfulAsset(item.fields.icon),
      }));
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchContacts);
</script>
