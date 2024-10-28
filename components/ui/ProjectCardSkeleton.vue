<template>
  <div class="rounded-xl transition-all duration-300 transform flex flex-col animate-pulse">
    <div
      class="relative group mb-4 md:mb-6 w-full h-64 sm:h-80 dark:bg-gray-700 bg-neutral-600 rounded-lg"
    ></div>

    <div class="flex flex-col xl:flex-row justify-between items-start sm:items-center mb-4">
      <div class="w-2/3 h-8 dark:bg-gray-700 bg-neutral-600 rounded mb-4 xl:mb-0"></div>
      <div class="flex flex-wrap xl:place-content-end xl:max-w-80 gap-2">
        <div
          v-for="index in 3"
          :key="index"
          class="rounded-full w-16 h-6 dark:bg-gray-700 bg-neutral-600"
        ></div>
      </div>
    </div>

    <div class="h-5 dark:bg-gray-700 bg-neutral-600 rounded mb-2"></div>
    <div class="h-5 dark:bg-gray-700 bg-neutral-600 rounded mb-2 w-5/6"></div>
  </div>
</template>
