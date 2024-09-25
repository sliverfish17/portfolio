import { useHead } from '#imports';

export const usePageMeta = (title: string, description: string) => {
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: '/images/avatar.jpg' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: '/images/avatar.jpg' },
    ],
  });
};
