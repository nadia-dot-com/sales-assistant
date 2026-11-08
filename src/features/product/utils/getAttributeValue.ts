import type { ProductAttribute } from "@/graphQl/types/commercetoolsProduct.types";

export function getAttributeValue(
  attributesRaw: ProductAttribute[],
  attributeName: string,
): string | null {
  const attribute = attributesRaw.find((a) => a.name === attributeName);

  console.warn(attribute);

  if (!attribute) {
    return null;
  }

  const attributeValue = attribute.value;

  if (typeof attributeValue === "string") {
    return attributeValue;
  }

  if (Array.isArray(attributeValue)) {
    return (
      attributeValue.map((attribute) => attribute.label).join(" / ") || null
    );
  }

  return attributeValue.label;
}
