<template>
  <footer class="w-full py-3 bg-primary-light dark:bg-primary-dark text-black dark:text-white">
    <div class="max-w-screen-xl mx-auto px-4 text-center space-y-4">
      <p class="text-sm dark:text-primary-light text-text-light">You can find me here:</p>

      <div class="flex justify-center gap-4 mt-2">
        <a
          v-for="link in contactLinks"
          :key="link.link"
          :href="link.link"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 dark:bg-white bg-slate-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:scale-105 hover:bg-accent-light dark:hover:bg-accent-dark"
        >
          <img :src="link.iconUrl" :alt="link.name" class="w-5 h-5" />
        </a>
      </div>

      <p class="text-xs mt-4 dark:text-primary-light text-text-light">
        © {{ new Date().getFullYear() }}
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

<style scoped>
footer {
  background: var(--tw-bg-opacity) bg-primary-light;
  color: var(--tw-text-opacity) text-black;
  /* Make sure footer sticks to the bottom */
  position: relative;
  bottom: 0;
  left: 0;
}
</style>
