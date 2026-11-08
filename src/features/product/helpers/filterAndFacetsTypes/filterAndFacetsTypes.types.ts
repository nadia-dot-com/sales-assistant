interface RangeFilterModel {
  range: { path: string; ranges: { from: string; to: string }[] };
}
interface ValueFilterModel {
  value: { path: string; values: string[] };
}
interface TreeFilterModel {
  tree: { path: string; rootValues: string[]; subTreeValues: string[] };
}
export interface SearchFilterInput {
  model: RangeFilterModel | ValueFilterModel | TreeFilterModel;
}
export interface SearchFacetInput {
  model:
    | {
        range: {
          path: string;
          ranges: { from: string; to: string }[];
          countProducts: boolean;
        };
      }
    | {
        terms: {
          path: string;
          alias: string;
          countProducts: boolean;
        };
      };
}
