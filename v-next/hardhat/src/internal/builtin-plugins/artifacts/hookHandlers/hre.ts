import type { HardhatRuntimeEnvironmentHooks } from "../../../../types/hooks.js";
import type { HardhatRuntimeEnvironment } from "../../../../types/hre.js";

import { ArtifactsManagerImplementation } from "../../../artifacts/artifacts-manager.js";

export default async (): Promise<Partial<HardhatRuntimeEnvironmentHooks>> => {
  const handlers: Partial<HardhatRuntimeEnvironmentHooks> = {
    created: async (context, hre, next): Promise<HardhatRuntimeEnvironment> => {
      const updatedHre = await next(context, hre);

      updatedHre.artifacts = new ArtifactsManagerImplementation();

      return updatedHre;
    },
  };

  return handlers;
};
