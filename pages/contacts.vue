<template>
  <div class="text-center py-16 space-y-8">
    <h1 class="text-4xl font-bold dark:text-primary-light text-text-light">Contacts</h1>
    <div class="border-b-2 w-16 mx-auto border-text-light dark:border-primary-light"></div>

    <p class="text-lg dark:text-primary-light text-text-light">You can find me here:</p>

    <div class="flex justify-center gap-4 mt-4">
      <a
        v-for="(link, index) in contactLinks"
        :key="index"
        :href="link.link"
        target="_blank"
        rel="noopener noreferrer"
        class="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md transition transform hover:scale-110"
      >
        <img :src="link.iconUrl" :alt="link.name" class="w-6 h-6" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#imports';

interface ContactLink {
  name: string;
  link: string;
  iconUrl: string;
}

const contactLinks = ref<ContactLink[]>([]);

const { $contentfulClient } = useNuxtApp();

const fetchContacts = async () => {
  try {
    const response = await $contentfulClient.getEntries({
      content_type: 'contacts',
    });

    if (response.items.length) {
      contactLinks.value = response.items.map((item: any) => ({
        name: item.fields.name,
        link: item.fields.link,
        iconUrl: item.fields.icon.fields.file.url.startsWith('//')
          ? `https:${item.fields.icon.fields.file.url}`
          : item.fields.icon.fields.file.url,
      }));
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchContacts);
</script>
