/**
 * Create discriminated union from array items.
 * @example
 * ```ts
 * const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'] as const;
 * type Values = ArrayValues<typeof SUPPORTED_FORMATS>;
 * // type Values = "image/jpg" | "image/jpeg" | "image/png"
 * ```
 */
type ArrayValues<ArrayType extends ReadonlyArray<unknown>> =
  ArrayType extends ReadonlyArray<infer ElementType> ? ElementType : never;
