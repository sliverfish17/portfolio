import { defineNuxtPlugin } from '#app';
import { createClient } from 'contentful';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const client = createClient({
    space: config.public.contentfulSpaceId || '',
    accessToken: config.public.contentfulAccessToken || '',
  });

  nuxtApp.provide('contentfulClient', client);
});
