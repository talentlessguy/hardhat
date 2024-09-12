import type { HardhatRuntimeEnvironmentHooks } from "../../../../types/hooks.js";

import { NetworkManagerImplementation } from "../network-manager.js";

export default async (): Promise<Partial<HardhatRuntimeEnvironmentHooks>> => ({
  created: async (context, hre, next) => {
    const updatedHre = await next(context, hre);

    updatedHre.network = new NetworkManagerImplementation(
      updatedHre.globalOptions.network !== ""
        ? updatedHre.globalOptions.network
        : updatedHre.config.defaultNetwork,
      updatedHre.config.defaultChainType,
      updatedHre.config.networks,
      context.hooks,
    );

    return updatedHre;
  },
});
