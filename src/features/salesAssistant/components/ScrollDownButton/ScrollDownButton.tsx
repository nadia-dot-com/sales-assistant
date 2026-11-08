"use client";

import { Icon, IconButton } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { type RefObject, useEffect, useState } from "react";
import { styles } from "@/features/salesAssistant/components/ScrollDownButton/ScrollDownButton.styles";

const TAG = "ScrollDownButton";
// matches `bottom: 3` of the sticky input bar in SalesAssistantView.styles
const INPUT_BAR_BOTTOM_OFFSET = 12;

interface ScrollDownButtonProps {
  getScroller: () => HTMLElement;
  targetRef: RefObject<HTMLDivElement | null>;
  inputBarRef: RefObject<HTMLDivElement | null>;
}

export function ScrollDownButton({
  getScroller,
  targetRef,
  inputBarRef,
}: ScrollDownButtonProps) {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const inputBar = inputBarRef.current;
    const barHeight = inputBar?.offsetHeight ?? 0;
    const options = {
      rootMargin: `0px 0px -${barHeight + INPUT_BAR_BOTTOM_OFFSET}px 0px`,
    };

    const observer = new IntersectionObserver((entries) => {
      const [{ isIntersecting }] = entries;

      if (!isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, options);

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetRef, inputBarRef]);

  const handleClickDown = () => {
    const target = targetRef.current;
    const inputBar = inputBarRef.current;
    if (!target) return;

    const scroller = getScroller();
    const targetBottom =
      scroller.scrollTop + target.getBoundingClientRect().bottom;
    const coveredByBar = inputBar
      ? scroller.clientHeight - inputBar.getBoundingClientRect().top
      : 0;
    const padding = 0;

    scroller.scrollTo({
      top: targetBottom - scroller.clientHeight + coveredByBar + padding,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      {...styles.scrollButton}
      data-visible={isVisible || undefined}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      aria-label={t("salesAssistantPage.chat.scrollDown.label")}
      onClick={handleClickDown}
      data-testid={TAG}
    >
      <Icon size="xl" {...styles.icon}>
        <ChevronDown />
      </Icon>
    </IconButton>
  );
}
