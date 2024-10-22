<template>
  <div class="text-center grid place-items-center gap-8">
    <Heading />
    <Projects />
    <Experience />
    <About />
    <Technologies />
    <Contact/>
  </div>
</template>

<script lang="ts" setup>
import Heading from '~/components/ui/Heading.vue';
import Projects from '~/components/ui/Projects.vue';

const Experience = defineAsyncComponent(() => import('~/components/ui/Experience.vue'));
const About = defineAsyncComponent(() => import('~/components/ui/About.vue'));
const Technologies = defineAsyncComponent(() => import('~/components/ui/Technologies.vue'));
const Contact = defineAsyncComponent(() => import('~/components/ui/Contact.vue'));

import { useHead } from '#imports';
import { mainPageSeo } from '~/constants/seoConfig';

useHead(mainPageSeo);

</script>
