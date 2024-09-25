<template>
  <div class="skills-page py-16">
    <h2 class="text-4xl font-bold text-center mb-12 text-text-dark dark:text-text-light underline">
      Skills
    </h2>

    <div class="flex flex-wrap justify-center gap-8">
      <!-- Frontend Skills Card -->
      <div
        ref="frontendSkillsCard"
        class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-80 transform transition hover:scale-105"
      >
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Frontend Skills:</h3>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li
            v-for="(skill, index) in frontendSkills"
            :key="index"
            class="border-b border-gray-300 dark:border-gray-600 py-1"
          >
            {{ skill }}
          </li>
        </ul>
      </div>

      <!-- Other Skills Card -->
      <div
        ref="otherSkillsCard"
        class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-80 transform transition hover:scale-105"
      >
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Other Skills:</h3>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li
            v-for="(skill, index) in otherSkills"
            :key="index"
            class="border-b border-gray-300 dark:border-gray-600 py-1"
          >
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const frontendSkills = [
  'HTML, CSS, SASS, LESS',
  'Tailwind, MUI, Bootstrap',
  'JavaScript, Typescript',
  'React, Next, Gatsby, Vue, Nuxt',
  'Redux, Redux-thunk, Redux-saga, RTK Query, Zustand',
  'REST, GraphQL',
  'GSAP',
];

const otherSkills = [
  'Firebase, Strapi, Storyblok',
  'Git, GitHub, GitLab',
  'Webpack, Vite, Farm',
  'GitHub Actions, Vercel',
  'Websockets, Socket.io',
  'Stripe, Cardbilling',
];

const frontendSkillsCard = ref<HTMLElement | null>(null);
const otherSkillsCard = ref<HTMLElement | null>(null);

onMounted(() => {
  if (frontendSkillsCard.value) {
    // Основная анимация появления карточки
    gsap.from(frontendSkillsCard.value, {
      opacity: 0,
      y: 100,
      rotate: 10, // Начальный поворот
      scale: 0.8, // Уменьшенный масштаб при появлении
      duration: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: frontendSkillsCard.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        // Добавляем непрерывную плавающую анимацию после появления
        gsap.to(frontendSkillsCard.value, {
          y: '+=10', // Плавающая анимация вверх/вниз
          rotate: '+=2', // Немного вращения
          duration: 3,
          yoyo: true, // Обратное воспроизведение
          repeat: -1, // Бесконечное повторение
          ease: 'sine.inOut',
        });
      },
    });

    // Анимация для каждого элемента внутри карточки
    gsap.from(frontendSkillsCard.value.querySelectorAll('li'), {
      opacity: 0,
      x: -30, // Сдвиг по оси X
      duration: 0.5,
      stagger: 0.15, // Задержка между элементами
      ease: 'power2.out',
      scrollTrigger: {
        trigger: frontendSkillsCard.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        // Плавающая анимация для каждого элемента списка
        frontendSkillsCard?.value?.querySelectorAll('li').forEach((li) => {
          gsap.to(li, {
            y: '+=5', // Легкое перемещение вверх/вниз
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });
        });
      },
    });
  }

  if (otherSkillsCard.value) {
    // Основная анимация появления карточки
    gsap.from(otherSkillsCard.value, {
      opacity: 0,
      y: 100,
      scale: 0.5,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: otherSkillsCard.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        gsap.to(otherSkillsCard.value, {
          y: '-=10',
          rotate: '-=2',
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      },
    });

    gsap.from(otherSkillsCard.value.querySelectorAll('li'), {
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: otherSkillsCard.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        otherSkillsCard?.value?.querySelectorAll('li').forEach((li) => {
          gsap.to(li, {
            y: '+=5',
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });
        });
      },
    });
  }
});
</script>

<style scoped></style>
