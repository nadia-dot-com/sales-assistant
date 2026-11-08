import type { ProductImage } from "@/features/product/types/product.types";
import type { Category } from "@/lib/category/category.types";
import type { PriceType } from "@/types/price.types";

export interface ProductDetailsAttributes {
  netContent: string | null;
  productForm: string | null;
  manufacturingCountry: string | null;
  targetNeed: string | null;
  packaging: string | null;
}

export interface ProductDetails {
  id: string;
  sku: string;
  name: string;
  description: string;
  slug: string;
  categories: Category[];
  price: PriceType;

  discounted: {
    name: string;
    centAmount: number;
  } | null;

  imagesUrls: ProductImage[];

  availability: {
    isOnStock: boolean;
    lowStock: boolean;
  };
  shortDescription: string | null;
  brand: string | null;
  attributes: ProductDetailsAttributes;
  ingredients: string | null;
}
