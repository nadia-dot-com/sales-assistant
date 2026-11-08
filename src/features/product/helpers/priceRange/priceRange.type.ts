export interface PriceRange {
  from: string;
  to: string;
}

export interface PriceBounds {
  min: number;
  max: number;
}

export interface RangeFacetResultValue {
  ranges: { min: number; max: number }[];
}

export interface FacetResult {
  facet: string;
  value: RangeFacetResultValue;
}
