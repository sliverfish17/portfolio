import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onUnmounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

interface GsapOptions {
  from?: GSAPTweenVars;
  to?: GSAPTweenVars;
}

export const useGsap = (refs: Ref<HTMLElement | null>[], options: GsapOptions) => {
  onMounted(() => {
    refs.forEach((ref) => {
      if (ref.value) {
        gsap.fromTo(ref.value, options.from || { opacity: 0, y: 20 }, {
          ...options.to,
          scrollTrigger: {
            trigger: ref.value,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    });
  });

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });
};
