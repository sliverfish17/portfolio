import { ref } from 'vue';
import { useNuxtApp } from '#imports';
import type { ContentfulResponse } from '~/types/contentful';

export function useContentful<TFields>(contentType: string) {
  const data = ref<ContentfulResponse<TFields>['items'] | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    try {
      const { $contentfulClient } = useNuxtApp();
      const response: ContentfulResponse<TFields> = await $contentfulClient.getEntries({
        content_type: contentType,
      });
      data.value = response.items;
    } catch (err) {
      error.value = 'Error fetching data from Contentful.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
}
