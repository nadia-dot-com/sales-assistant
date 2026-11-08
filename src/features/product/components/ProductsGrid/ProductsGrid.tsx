import { Flex, Grid, GridItem, Heading, Icon, Text } from "@chakra-ui/react";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { ProductCard } from "@/features/product/components/ProductCard/ProductCard";
import { styles } from "@/features/product/components/ProductsGrid/ProductsGrid.styles";
import type { ProductsByKeysResponse } from "@/features/product/types/productResponse.types";
import { ChatProductCard } from "@/features/salesAssistant/components/ChatProductCard/ChatProductCard";

export interface ProductGridProps {
  productsResult: ProductsByKeysResponse;
  isChat?: boolean;
}

export function ProductGrid({ productsResult, isChat }: ProductGridProps) {
  const t = useTranslations();

  return (
    <Flex {...styles.container}>
      <Flex {...styles.totalProducts}>
        <Icon
          {...{
            ...styles.totalProductsIcon,
            ...(isChat && styles.invertedStyle),
          }}
        >
          <Info />
        </Icon>
        <Heading
          {...{
            ...styles.totalProductsHeading,
            ...(isChat && styles.invertedStyle),
          }}
        >
          {t("searchPage.productsList.totalProducts")}
          <Text>{productsResult.totalProducts}</Text>
        </Heading>
      </Flex>
      <Suspense>
        <Grid {...(isChat ? styles.chatGrid : styles.grid)}>
          {productsResult.products.map((product) => (
            <GridItem
              key={product.key}
              {...(isChat ? styles.gridItemChat : styles.gridItem)}
            >
              {isChat ? (
                <ChatProductCard product={product} score={product.score ?? 0} />
              ) : (
                <ProductCard productInList={product} />
              )}
            </GridItem>
          ))}
        </Grid>
      </Suspense>
    </Flex>
  );
}
