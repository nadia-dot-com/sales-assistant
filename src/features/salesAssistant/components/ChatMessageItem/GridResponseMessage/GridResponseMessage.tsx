"use client";

import { Flex, Icon, ListItem } from "@chakra-ui/react";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { ResponseLabel } from "@/components/atoms/ResponseLabel/ResponseLabel";
import { CHAT_PRODUCTS_PER_PAGE_LIMIT } from "@/config/constants";
import { stripFacetPrefix } from "@/features/product/helpers/facets/facetPrefix";
import type { ProductFacetResponse } from "@/features/product/types/productResponse.types";
import { styles } from "@/features/salesAssistant/components/ChatMessageItem/GridResponseMessage/GridResponseMessage.styles";
import { ChatProductsList } from "@/features/salesAssistant/components/ChatProductsList/ChatProductsList";
import type { GridResponseChatMessage } from "@/features/salesAssistant/types/responseAndRequest.types";

const GRID_RESPONSE_TEST_ID = "ChatMessageItem-gridResponse";

interface GridResponseMessageProps {
  message: GridResponseChatMessage;
  isLoading: boolean;
  facetMap: ProductFacetResponse["facetMap"];
  onFiltersChange: (messageId: string, params: URLSearchParams) => void;
}

export function GridResponseMessage({
  message,
  facetMap,
  onFiltersChange,
}: GridResponseMessageProps) {
  const t = useTranslations();
  const productsResult = message.messageDetails;

  const lastPageNumber = Math.ceil(
    productsResult.totalProducts / CHAT_PRODUCTS_PER_PAGE_LIMIT,
  );

  const filtersAppliedToFacets = productsResult.facets?.map((facet) => ({
    ...facet,
    selectedOptions: message.filtersApplied.find(
      (filter) => filter.key === facet.facet,
    )?.selectedOptions,
  }));

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();

    if (message.sort) params.set("sort", message.sort);
    if (message.priceRange.from)
      params.set("priceFrom", message.priceRange.from);
    if (message.priceRange.to) params.set("priceTo", message.priceRange.to);

    message.filtersApplied.forEach((filter) => {
      if (filter.selectedOptions?.length) {
        params.set(
          stripFacetPrefix(filter.key),
          filter.selectedOptions.map(stripFacetPrefix).join("."),
        );
      }
    });

    params.set("page", page.toString());
    onFiltersChange(message.id, params);
  };

  const currentPageNumber = message.page;

  const pageOffset = (currentPageNumber - 1) * CHAT_PRODUCTS_PER_PAGE_LIMIT;

  const productsRangeEnd = pageOffset + productsResult.products.length;
  const productsRangeStart = Math.min(pageOffset + 1, productsRangeEnd);

  return (
    <ListItem
      aria-label={`${t("salesAssistantPage.chat.message.results")} (${productsRangeStart}-${productsRangeEnd})`}
      {...styles.gridResponseItem}
    >
      <Flex {...styles.icon}>
        <Icon size="lg">
          <Bot />
        </Icon>
      </Flex>
      <Flex data-testid={GRID_RESPONSE_TEST_ID} {...styles.content}>
        <ResponseLabel
          title={`${t("salesAssistantPage.chat.grid.label")} (${productsRangeStart}-${productsRangeEnd})`}
        />
        <ChatProductsList
          totalProducts={productsResult.totalProducts}
          products={productsResult.products}
          priceBounds={productsResult.priceBounds}
          currentPageNumber={currentPageNumber}
          lastPageNumber={lastPageNumber}
          selectedRange={message.priceRange}
          filters={filtersAppliedToFacets}
          facetMap={facetMap}
          onChange={(params) => onFiltersChange(message.id, params)}
          onPageChange={handlePageChange}
        />
      </Flex>
    </ListItem>
  );
}
