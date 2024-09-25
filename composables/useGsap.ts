import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export const useGsap = (refs: Ref<HTMLElement | null>[], options: GSAPTweenVars) => {
  onMounted(() => {
    refs.forEach((ref) => {
      if (ref.value) {
        gsap.fromTo(
          ref.value,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.value,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            ...options,
          },
        );
      }
    });
  });
};
