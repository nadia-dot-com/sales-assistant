import type { BetterAuthClientPlugin } from "better-auth";
import type { commercetoolsPlugin } from "@/features/auth/config/server/commercetoolsPlugin";

export const commercetoolsClientPlugin = () =>
  ({
    id: "commercetools",
    $InferServerPlugin: {} as ReturnType<typeof commercetoolsPlugin>,
  }) satisfies BetterAuthClientPlugin;
