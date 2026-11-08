import { Carousel } from "@chakra-ui/react";
import { NextImage } from "@/components/atoms/NextImage";
import { styles } from "@/features/product/components/ImageCarousel/ImageCarousel.styles";
import type { ProductImage } from "@/features/product/types/product.types";

interface ImageCarouselProps {
  imagesUrls: ProductImage[];
  productName: string;
}

const TAG = "ImageCarousel";

export function ImageCarousel({ imagesUrls }: ImageCarouselProps) {
  return (
    <Carousel.Root
      data-testid={TAG}
      slideCount={imagesUrls.length}
      unstyled
      {...styles.root}
    >
      <Carousel.Control>
        <Carousel.ItemGroup {...styles.itemContainer}>
          {imagesUrls.map((image, index) => (
            <Carousel.Item
              data-testid={`${TAG}-item-${index}`}
              {...styles.carouselItem}
              key={image.url}
              index={index}
            >
              <NextImage
                loading={index === 0 ? "eager" : "lazy"}
                src={image.url}
                alt={image.alt}
                width={500}
                height={500}
                style={{ ...styles.carouselImage }}
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
      </Carousel.Control>

      <Carousel.IndicatorGroup {...styles.groupMd}>
        {imagesUrls.map((image, index) => (
          <Carousel.Indicator
            data-testid={`${TAG}-indicator-md-${index}`}
            key={image.url}
            index={index}
            unstyled
            {...styles.indicatorMd}
          >
            <NextImage
              loading="lazy"
              src={image.url}
              alt={image.alt}
              width={100}
              height={100}
              style={{ ...styles.imageMd }}
            />
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>

      <Carousel.IndicatorGroup {...styles.groupBase}>
        {imagesUrls.map((image, index) => (
          <Carousel.Indicator
            data-testid={`${TAG}-indicator-base-${index}`}
            key={image.url}
            index={index}
            {...styles.indicatorBase}
          />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
}
