<template>
  <div class="container grid gap-20 sm:gap-24 md:gap-28 lg:gap-32 xl:gap-36">
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
