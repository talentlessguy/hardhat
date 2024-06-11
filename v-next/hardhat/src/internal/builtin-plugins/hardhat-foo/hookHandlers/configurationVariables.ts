import type { ConfigurationVariableHooks } from "@nomicfoundation/hardhat-core/types/hooks";

export default async () => {
  const handlers: Partial<ConfigurationVariableHooks> = {
    fetchValue: async (context, variable, _next) => {
      return context.interruptions.requestSecretInput(
        "Plugin that overrides the config vars resolution",
        variable.name,
      );
    },
  };

  return handlers;
};
