/// <reference types="nuxt" />
import { ContentfulClientApi } from 'contentful';

declare module '#app' {
  interface NuxtApp {
    $contentfulClient: ContentfulClientApi;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $contentfulClient: ContentfulClientApi;
  }
}
