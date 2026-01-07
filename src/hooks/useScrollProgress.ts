import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ScrollProgressOptions {
  target?: RefObject<HTMLElement>;
  offset?: ["start end" | "start start" | "end end" | "end start", "start end" | "start start" | "end end" | "end start"];
}

export const useScrollProgress = (options?: ScrollProgressOptions) => {
  const { scrollYProgress } = useScroll({
    target: options?.target,
    offset: options?.offset || ["start end", "end start"]
  });

  return scrollYProgress;
};

export const useParallax = (
  scrollYProgress: MotionValue<number>,
  range: [number, number]
): MotionValue<number> => {
  return useTransform(scrollYProgress, [0, 1], range);
};
