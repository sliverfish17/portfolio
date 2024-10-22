import { onMounted, onUnmounted, ref } from 'vue';

export const useIntersectionObserver = (
  targetRefs: Ref<HTMLElement | null>[],
  callback: () => void,
  threshold?: number,
) => {
  const observer = ref<IntersectionObserver | null>(null);

  onMounted(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.value?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold ?? 0.5,
      },
    );

    targetRefs.forEach((ref) => {
      if (ref.value) {
        observer.value?.observe(ref.value);
      }
    });
  });

  onUnmounted(() => {
    observer.value?.disconnect();
  });
};
