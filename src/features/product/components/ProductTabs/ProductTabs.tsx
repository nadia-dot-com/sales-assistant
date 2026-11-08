"use client";

import { Accordion, Tabs, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ProductParametersList } from "@/features/product/components/ProductTabs/ProductParametersList";
import { styles } from "@/features/product/components/ProductTabs/ProductTabs.styles";
import {
  type ProductTabItem,
  TabsTriggerValues,
} from "@/features/product/types/ProductTabs.types";
import type { ProductDetailsAttributes } from "@/features/product/types/productDetails.types";
import { getParameterRows } from "@/features/product/utils/getParameterRows";

const TAG = "ProductTabs";

interface ProductTabsProps {
  description: string | null;
  attributes: ProductDetailsAttributes;
  ingredients: string | null;
}

function renderTabValue(item: ProductTabItem, t: (key: string) => string) {
  if ("parameters" in item) {
    return item.parameters.length > 0 ? (
      <ProductParametersList parameters={item.parameters} />
    ) : (
      <Text {...styles.descriptionText}>
        {t("productPage.productTabs.additionalInformationEmpty")}
      </Text>
    );
  }

  return <Text {...styles.descriptionText}>{item.content}</Text>;
}

export function ProductTabs({
  description,
  ingredients,
  attributes,
}: ProductTabsProps) {
  const t = useTranslations();
  const items: ProductTabItem[] = [
    {
      value: TabsTriggerValues.Description,
      label: t("productPage.productTabs.description"),
      content: description || t("productPage.productTabs.descriptionEmpty"),
    },
    {
      value: TabsTriggerValues.Additional,
      label: t("productPage.productTabs.additionalInformation"),
      parameters: getParameterRows(attributes, t),
    },
    {
      value: TabsTriggerValues.Ingredients,
      label: t("productPage.productTabs.ingredients"),
      content: ingredients || t("productPage.productTabs.ingredientsEmpty"),
    },
    {
      value: TabsTriggerValues.Reviews,
      label: t("productPage.productTabs.reviews", { count: 1 }),
      content: t("productPage.productTabs.reviewsEmpty"),
    },
  ];

  return (
    <>
      <Tabs.Root
        {...styles.root}
        defaultValue={TabsTriggerValues.Description}
        data-testid={TAG}
      >
        <Tabs.List {...styles.tabsList}>
          {items.map((item) => (
            <Tabs.Trigger
              key={item.value}
              value={item.value}
              {...styles.trigger}
            >
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {items.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            {renderTabValue(item, t)}
          </Tabs.Content>
        ))}
      </Tabs.Root>

      <Accordion.Root
        {...styles.listRoot}
        collapsible
        defaultValue={[TabsTriggerValues.Description]}
        data-testid={`${TAG}-accordion`}
      >
        {items.map((item) => (
          <Accordion.Item
            key={item.value}
            value={item.value}
            {...styles.listItem}
          >
            <Accordion.ItemTrigger {...styles.listItemTrigger}>
              {item.label}
              <Accordion.ItemIndicator
                data-testid={`${TAG}-indicator-${item.value}`}
                {...styles.listItemIndicator}
              />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent {...styles.listItemContent}>
              {renderTabValue(item, t)}
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
}
