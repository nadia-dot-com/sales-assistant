const DATABASE_PREFIX = "gp26_";

export const stripFacetPrefix = (value: string) =>
  value.startsWith(DATABASE_PREFIX)
    ? value.slice(DATABASE_PREFIX.length)
    : value;

export const addFacetPrefix = (value: string) => `${DATABASE_PREFIX}${value}`;
