import { useTransition } from "react";

export function usePendingAction<Args extends unknown[]>(
  action: (...args: Args) => Promise<unknown>,
) {
  const [isPending, startTransition] = useTransition();

  const run = (...args: Args) => {
    startTransition(async () => {
      await action(...args);
    });
  };

  return { run, isPending };
}
