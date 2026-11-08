"use client";
import {
  Box,
  Flex,
  Popover,
  Portal,
  Slider,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { EditablePrice } from "@/components/organisms/FiltersBar/PriceRangeSlider/EditablePrice/EditablePrice";
import { styles } from "@/components/organisms/FiltersBar/PriceRangeSlider/PriceRangeSlider.styles";
import type {
  PriceBounds,
  PriceRange,
} from "@/features/product/helpers/priceRange/priceRange.type";

const TAG = "PriceRangeSlider";

export interface PriceRangeSliderProps {
  priceBounds: PriceBounds;
  selectedRange: PriceRange;
  performMutation: (
    mutate: (params: URLSearchParams) => void,
    pendingKey?: string,
  ) => void;
}

export function PriceRangeSlider({
  priceBounds,
  selectedRange,
  performMutation,
}: PriceRangeSliderProps) {
  const t = useTranslations();

  const handlePriceRangeChange = (priceRange: number[]) => {
    performMutation((params) => {
      params.set("priceFrom", priceRange[0].toString());
      params.set("priceTo", priceRange[1].toString());
    });
  };

  const min = priceBounds.min;
  const max = priceBounds.max > min ? priceBounds.max : min + 1;

  const clamp = (value: number) => Math.min(Math.max(value, min), max);

  const from = clamp(Number(selectedRange.from) || min);
  const to = clamp(Number(selectedRange.to) || max);

  const [rangeValues, setRangeValues] = useState<[number, number]>([from, to]);

  const [prevRange, setPrevRange] = useState<[number, number]>([from, to]);

  if (prevRange[0] !== from || prevRange[1] !== to) {
    setPrevRange([from, to]);
    setRangeValues([from, to]);
  }

  return (
    <Popover.Root
      positioning={{ placement: "bottom-start", sameWidth: true }}
      data-testid={TAG}
    >
      <Popover.Trigger asChild>
        <Flex {...styles.trigger}>
          <Text {...styles.triggerLabel}>
            {t("searchPage.priceRangeSlider.label")}
          </Text>
          <Box {...styles.triggerIcon}>
            <ChevronDown size={16} />
          </Box>
        </Flex>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content {...styles.popoverContent}>
            <Popover.Body>
              <Stack {...styles.sliderStack}>
                <Slider.Root
                  key={`${min}-${max}`}
                  min={min}
                  max={max}
                  value={rangeValues}
                  onValueChange={(e) =>
                    setRangeValues([e.value[0], e.value[1]])
                  }
                  onValueChangeEnd={(e) => handlePriceRangeChange(e.value)}
                >
                  <Slider.Label {...styles.sliderLabel}>
                    <EditablePrice
                      value={rangeValues[0]}
                      min={min}
                      max={rangeValues[1]}
                      onCommit={(cents) =>
                        handlePriceRangeChange([cents, rangeValues[1]])
                      }
                    />
                    <EditablePrice
                      value={rangeValues[1]}
                      min={rangeValues[0]}
                      max={max}
                      onCommit={(cents) =>
                        handlePriceRangeChange([rangeValues[0], cents])
                      }
                    />
                  </Slider.Label>
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                  </Slider.Control>
                </Slider.Root>
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
