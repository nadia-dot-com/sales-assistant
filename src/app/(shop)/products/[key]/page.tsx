import { Flex, Heading, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { styles } from "@/app/(shop)/products/[key]/page.styles";
import { DiscountBadge } from "@/components/atoms/DiscountBadge/DiscountBadge";
import { CategoryBreadcrumb } from "@/components/molecules/CategoryBreadcrumb/CategoryBreadcrumb";
import { NotifyButton } from "@/components/molecules/NotifyButton/NotifyButton";
import { ProductPrice } from "@/components/molecules/ProductPrice/ProductPrice";
import { StockBadge } from "@/components/molecules/StockBadge/StockBadge";
import { BETTER_AUTH_URL } from "@/config/env.public";
import { routes } from "@/config/routes";
import { getProduct } from "@/features/product/api/getProduct";
import { ImageCarousel } from "@/features/product/components/ImageCarousel/ImageCarousel";
import { ProductTabs } from "@/features/product/components/ProductTabs/ProductTabs";
import { PurchaseSection } from "@/features/product/components/PurchaseSection/PurchaseSection";
import { defineStockStatus } from "@/features/product/utils/defineStockStatus";
import { getMetadata } from "@/sanity/queries/getMetadata";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";
import { toShareDescription } from "@/utils/toShareDescription";

const TAG = "ProductDetails";

interface ProductDetailsProps extends PageProps<"/products/[key]"> {}

export async function generateMetadata({
  params,
}: ProductDetailsProps): Promise<Metadata> {
  const { key } = await params;

  const [product, metadata] = await Promise.all([
    getProduct(key),
    getMetadata(),
  ]);

  const { name, shortDescription, description, imagesUrls } = product;
  const title = name;
  const shareDescription = toShareDescription(shortDescription || description);
  const image = imagesUrls[0]?.url || metadata.socialShareImage;

  return {
    title,
    description: shareDescription,

    openGraph: {
      title,
      description: shareDescription,
      url: `${BETTER_AUTH_URL}/${routes.product(key)}`,
      images: [{ url: image }],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: shareDescription,
      images: [image],
    },
  };
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { key } = await params;

  const [product] = await Promise.all([
    getProduct(key),
    getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.productPage),
  ]);

  const {
    id,
    sku,
    name,
    shortDescription,
    description,
    price,
    availability,
    categories,
    discounted,
    imagesUrls,
    brand,
    attributes,
    ingredients,
  } = product;

  const stockStatus = defineStockStatus(
    availability.isOnStock,
    availability.lowStock,
  );

  const isOutOfStock = stockStatus === "outOfStock";

  return (
    <Flex {...styles.container} data-testid={TAG}>
      <CategoryBreadcrumb categoryList={categories} productName={name} />
      <Flex {...styles.topSection}>
        {discounted?.name && <DiscountBadge name={discounted.name} />}
        <ImageCarousel imagesUrls={imagesUrls} productName={name} />
        <Flex {...styles.infoColumn}>
          {brand && <Text {...styles.brand}>{brand}</Text>}
          <Heading as="h1" size="2xl" {...styles.title}>
            {name}
          </Heading>
          <Text {...styles.description}>{shortDescription}</Text>
          <ProductPrice
            price={price}
            discounted={discounted && { centAmount: discounted.centAmount }}
          />
          <StockBadge stockStatus={stockStatus} size="md" />
          {isOutOfStock ? (
            <NotifyButton subjectName={name} />
          ) : (
            <PurchaseSection
              productId={id}
              isOnStock={availability.isOnStock}
              lowStock={availability.lowStock}
              sku={sku}
            />
          )}
        </Flex>
      </Flex>
      <ProductTabs
        description={description}
        ingredients={ingredients}
        attributes={attributes}
      />
    </Flex>
  );
}
