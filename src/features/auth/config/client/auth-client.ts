import { createAuthClient } from "better-auth/react";
import { commercetoolsClientPlugin } from "@/features/auth/config/client/commercetoolsClientPlugin";

export const authClient = createAuthClient({
  plugins: [commercetoolsClientPlugin()],
});
