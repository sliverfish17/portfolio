<template>
  <h2 class="text-2xl font-bold mb-6 dark:text-text-dark">You can find me here:</h2>
  <ul class="flex items-center font-pangaia justify-center gap-8">
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
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNuxtApp, useState } from '#imports';
import type { ContactResponse, MappedContactLink } from '~/types/contacts';

const contactLinks = useState<MappedContactLink[]>('contactLinks', () => []);

const { $contentfulClient } = useNuxtApp();

const fetchContacts = async () => {
  if (contactLinks.value.length > 0) {
    return;
  }

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
