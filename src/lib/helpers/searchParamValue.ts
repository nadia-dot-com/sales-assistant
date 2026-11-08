export const searchParamValue = (
  searchParam: string | string[] | undefined,
) => {
  return `${searchParam ?? ""}`;
};
