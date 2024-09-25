import { createClient } from 'contentful';
import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();

const client = createClient({
  space: config.public.contentfulSpaceId || '',
  accessToken: config.public.contentfulAccessToken || '',
});

export default client;
