import { ref } from 'vue';
import { useNuxtApp } from '#imports';
import type { ContentfulItem, ContentfulResponse } from '~/types/contentful';

export function useContentful<TFields>(contentType: string, limit = 4) {
  const data = ref<ContentfulResponse<TFields>['items'] | null>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const skip = ref(0);
  const totalEntries = ref(0);

  const fetchData = async () => {
    try {
      const { $contentfulClient } = useNuxtApp();
      const response: ContentfulResponse<TFields> = await $contentfulClient.getEntries({
        content_type: contentType,
        limit,
        skip: skip.value,
      });

      if (response.items.length > 0) {
        data.value = [...(data.value as ContentfulItem<TFields>[]), ...response.items];
        skip.value += limit;
        totalEntries.value = response.total;
      }
    } catch (err) {
      error.value = 'Error fetching data';
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
    skip,
    totalEntries,
  };
}
