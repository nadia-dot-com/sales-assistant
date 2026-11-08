"use client";

import { ButtonGroup, Pagination } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { PaginationLink } from "@/features/product/components/ProductsList/ProductListPagination/PaginationLink/PaginationLink";
import { styles } from "@/features/product/components/ProductsList/ProductListPagination/ProductListPagination.styles";

export interface ProductPagePagination {
  currentPageNumber: number;
  lastPageNumber: number;
}

interface ProductListPaginationProps extends ProductPagePagination {
  onPageChange?: (page: number) => void;
}

export function ProductListPagination({
  currentPageNumber,
  lastPageNumber,
  onPageChange,
}: ProductListPaginationProps) {
  const t = useTranslations();

  if (lastPageNumber <= 1) {
    return null;
  }

  return (
    <Pagination.Root
      as="nav"
      aria-label={t("searchPage.productListPagination.label")}
      count={lastPageNumber}
      pageSize={1}
      page={currentPageNumber}
      {...styles.root}
    >
      <ButtonGroup
        variant="ghost"
        size={{ base: "2xs", sm: "sm" }}
        gap={{ base: "1" }}
      >
        <PaginationLink
          page="prev"
          onPageChange={onPageChange}
          aria-label={t("searchPage.productListPagination.previousPage")}
        >
          <ChevronLeft />
        </PaginationLink>

        <Pagination.Items
          render={(page) => (
            <PaginationLink page={page.value} onPageChange={onPageChange}>
              {page.value}
            </PaginationLink>
          )}
        />

        <PaginationLink
          page="next"
          onPageChange={onPageChange}
          aria-label={t("searchPage.productListPagination.nextPage")}
        >
          <ChevronRight />
        </PaginationLink>
      </ButtonGroup>
    </Pagination.Root>
  );
}
