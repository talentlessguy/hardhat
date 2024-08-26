import type {
  Eip1193Provider,
  NetworkConnection,
  NetworkManager,
} from "./types.js";
import type {
  ChainType,
  DefaultChainType,
  NetworkConfig,
} from "@ignored/hardhat-vnext/types/config";
import type {
  HookContext,
  HookManager,
} from "@ignored/hardhat-vnext/types/hooks";

export class NetworkManagerImplementation implements NetworkManager {
  readonly #defaultNetwork: string;
  readonly #defaultChainType: DefaultChainType;
  readonly #networkConfig: Record<string, NetworkConfig>;
  readonly #hookManager: HookManager;

  constructor(
    defaultNetwork: string,
    defaultChainType: DefaultChainType,
    networkConfig: Record<string, NetworkConfig>,
    hookManager: HookManager,
  ) {
    this.#networkConfig = networkConfig;
    this.#hookManager = hookManager;
    this.#defaultNetwork = defaultNetwork;
    this.#defaultChainType = defaultChainType;
  }

  public async connect<ChainTypeT extends ChainType = DefaultChainType>(
    networkName?: string,
    chainType?: ChainTypeT,
  ): Promise<NetworkConnection<ChainTypeT>> {
    const networkConnection = await this.#hookManager.runHandlerChain(
      "network",
      "newNetworkConnection",
      [],
      async (_nextContext: HookContext) =>
        this.#initializeNetworkConnection(networkName, chainType),
    );

    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
    We know that the network connection is a NetworkConnection<ChainTypeT>, but
    typescript gets lost. */
    return networkConnection as NetworkConnection<ChainTypeT>;
  }

  async #initializeNetworkConnection<
    ChainTypeT extends ChainType = DefaultChainType,
  >(
    networkName?: string,
    chainType?: ChainTypeT,
  ): Promise<NetworkConnection<ChainTypeT>> {
    const name = networkName ?? this.#defaultNetwork;

    // if this.#networkConfig[name].chainType is !== undefined, it must match chainType or throw

    const createProvider = async (
      networkConnection: NetworkConnectionImplementation<ChainTypeT>,
    ) => {
      const ethereumProvider = await EthereumProvider.create({
        url: this.#networkConfig[name].url,
        networkName: name,
        extraHeaders: this.#networkConfig[name].headers,
        timeout: this.#networkConfig[name].timeout,
        hookManager: this.#hookManager, // pass the hook manager to the provider so we can run the onRequest hook handlers
        networkConnection,
      });

      return ethereumProvider;
    };

    // TODO: If the network type is HTTP or EDR we do different things here.
    return NetworkConnectionImplementation.create(
      name,
      chainType ??
        this.#networkConfig[name].chainType ??
        (this.#defaultChainType as ChainTypeT),
      this.#networkConfig[name],
      this.#hookManager,
      createProvider,
    );
  }
}

export class NetworkConnectionImplementation<
  ChainTypeT extends ChainType | string,
> implements NetworkConnection<ChainTypeT>
{
  readonly #hookManager: HookManager;

  public readonly networkName: string;
  public readonly config: NetworkConfig;
  public readonly chainType: ChainTypeT;
  #provider!: Eip1193Provider;

  public static async create<ChainTypeT extends ChainType | string>(
    networkName: string,
    chainType: ChainTypeT,
    networkConfig: NetworkConfig,
    hookManager: HookManager,
    createProvider: (
      networkConnection: NetworkConnectionImplementation<ChainTypeT>,
    ) => Promise<Eip1193Provider>,
  ): Promise<NetworkConnectionImplementation<ChainTypeT>> {
    const netconn = new NetworkConnectionImplementation(
      hookManager,
      networkName,
      networkConfig,
      chainType,
    );

    const provider = await createProvider(netconn);
    netconn.#setProvider(provider);
    return netconn;
  }

  private constructor(
    hookManager: HookManager,
    networkName: string,
    config: NetworkConfig,
    chainType: ChainTypeT,
    // provider: Eip1193Provider,
  ) {
    this.#hookManager = hookManager;
    this.networkName = networkName;
    this.config = config;
    this.chainType = chainType;
    // this.provider = provider;

    this.close = this.close.bind(this);
  }

  public get provider(): Eip1193Provider {
    return this.#provider;
  }

  #setProvider(provider: Eip1193Provider) {
    this.#provider = provider;
  }

  public async close(): Promise<void> {
    await this.#hookManager.runHandlerChain(
      "network",
      "closeConnection",
      [this],
      async (
        _context: HookContext,
        _connection: NetworkConnection<string>,
      ) => {},
    );
  }
}
