import { useLayoutEffect, useRef, useState } from "react";

interface UseOverflowCountOptions {
  itemCount: number;
  gap: number;
}

export function useOverflowCount({ itemCount, gap }: UseOverflowCountOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);
  const [measured, setMeasured] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) return;

    const calculateElements = () => {
      const available = container.clientWidth;
      const items = Array.from(measure.children) as HTMLElement[];

      const totalWidth = items.reduce(
        (sum, element, index) =>
          sum + element.offsetWidth + (index > 0 ? gap : 0),
        0,
      );

      if (totalWidth <= available) {
        setVisibleCount(items.length);
        setMeasured(true);
        return;
      }

      const reserve = moreRef.current ? moreRef.current.offsetWidth + gap : 0;
      let used = 0;
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        const next = used + items[i].offsetWidth + (i > 0 ? gap : 0);
        if (next + reserve > available) break;
        used = next;
        count += 1;
      }
      setVisibleCount(count);
      setMeasured(true);
    };

    calculateElements();

    const observer = new ResizeObserver(calculateElements);
    observer.observe(container);

    return () => observer.disconnect();
  }, [gap]);

  return { containerRef, measureRef, moreRef, visibleCount, measured };
}
