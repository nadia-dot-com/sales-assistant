export const pause = async (delay: number) =>
  await new Promise((resolve) => setTimeout(resolve, delay));
