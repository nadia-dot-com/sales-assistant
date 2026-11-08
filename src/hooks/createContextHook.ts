import { type Context, type FC, useContext } from "react";

type ProviderComponent = FC<never>;

export function createContextHook<T>(
  context: Context<T>,
  provider: ProviderComponent,
) {
  return function useContextHook() {
    const contextValue = useContext(context);
    if (contextValue === null || contextValue === undefined) {
      const providerName = getProviderName(provider);
      throw new Error(`this component must be used within a ${providerName}`);
    }
    return contextValue;
  };
}

function getProviderName(provider: ProviderComponent | string) {
  return typeof provider === "string"
    ? provider
    : provider.name || provider.displayName || "provider";
}
