/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

export interface AccessListItem {
  /** 20-byte address buffer */
  address: Buffer
  storageKeys: Array<Buffer>
}
export interface Bytecode {
  /** 256-bit code hash */
  readonly hash: Buffer
  /** Byte code */
  readonly code: Buffer
}
export interface Account {
  /** Account balance */
  readonly balance: bigint
  /** Account nonce */
  readonly nonce: bigint
  /** Optionally, byte code. Otherwise, hash is equal to `KECCAK_EMPTY` */
  readonly code?: Bytecode
}
/** An account that needs to be created during the genesis block. */
export interface GenesisAccount {
  /** Account private key */
  privateKey: string
  /** Account balance */
  balance: bigint
}
export interface BlockConfig {
  number?: bigint
  beneficiary?: Buffer
  timestamp?: bigint
  difficulty?: bigint
  mixHash?: Buffer
  baseFee?: bigint
  gasLimit?: bigint
  parentHash?: Buffer
  blobExcessGas?: bigint
}
export interface BlockOptions {
  /** The parent block's hash */
  parentHash?: Buffer
  /** The block's beneficiary */
  beneficiary?: Buffer
  /** The state's root hash */
  stateRoot?: Buffer
  /** The receipts' root hash */
  receiptsRoot?: Buffer
  /** The logs' bloom */
  logsBloom?: Buffer
  /** The block's difficulty */
  difficulty?: bigint
  /** The block's number */
  number?: bigint
  /** The block's gas limit */
  gasLimit?: bigint
  /** The block's timestamp */
  timestamp?: bigint
  /** The block's extra data */
  extraData?: Buffer
  /** The block's mix hash (or prevrandao) */
  mixHash?: Buffer
  /** The block's nonce */
  nonce?: Buffer
  /** The block's base gas fee */
  baseFee?: bigint
  /** The hash tree root of the parent beacon block for the given execution block (EIP-4788). */
  parentBeaconBlockRoot?: Buffer
}
/** Information about the blob gas used in a block. */
export interface BlobGas {
  /** The total amount of blob gas consumed by the transactions within the block. */
  gasUsed: bigint
  /**
   * The running total of blob gas consumed in excess of the target, prior to
   * the block. Blocks with above-target blob gas consumption increase this value,
   * blocks with below-target blob gas consumption decrease it (bounded at 0).
   */
  excessGas: bigint
}
export interface BlockHeader {
  parentHash: Buffer
  ommersHash: Buffer
  beneficiary: Buffer
  stateRoot: Buffer
  transactionsRoot: Buffer
  receiptsRoot: Buffer
  logsBloom: Buffer
  difficulty: bigint
  number: bigint
  gasLimit: bigint
  gasUsed: bigint
  timestamp: bigint
  extraData: Buffer
  mixHash: Buffer
  nonce: Buffer
  baseFeePerGas?: bigint
  withdrawalsRoot?: Buffer
  blobGas?: BlobGas
  parentBeaconBlockRoot?: Buffer
}
/** Identifier for the Ethereum spec. */
export const enum SpecId {
  /** Frontier */
  Frontier = 0,
  /** Frontier Thawing */
  FrontierThawing = 1,
  /** Homestead */
  Homestead = 2,
  /** DAO Fork */
  DaoFork = 3,
  /** Tangerine */
  Tangerine = 4,
  /** Spurious Dragon */
  SpuriousDragon = 5,
  /** Byzantium */
  Byzantium = 6,
  /** Constantinople */
  Constantinople = 7,
  /** Petersburg */
  Petersburg = 8,
  /** Istanbul */
  Istanbul = 9,
  /** Muir Glacier */
  MuirGlacier = 10,
  /** Berlin */
  Berlin = 11,
  /** London */
  London = 12,
  /** Arrow Glacier */
  ArrowGlacier = 13,
  /** Gray Glacier */
  GrayGlacier = 14,
  /** Merge */
  Merge = 15,
  /** Shanghai */
  Shanghai = 16,
  /** Cancun */
  Cancun = 17,
  /** Latest */
  Latest = 18
}
/** If not set, uses defaults from [`CfgEnv`]. */
export interface ConfigOptions {
  /** The blockchain's ID */
  chainId?: bigint
  /** Identifier for the Ethereum spec */
  specId?: SpecId
  /** The contract code size limit for EIP-170 */
  limitContractCodeSize?: bigint
  /** The initcode code size limit for EIP-31860 */
  limitInitcodeSize?: bigint
  /** Disables block limit validation */
  disableBlockGasLimit?: boolean
  /** Disables EIP-3607, which rejects transactions from sender with deployed code */
  disableEip3607?: boolean
}
/** Get trace output for `debug_traceTransaction` */
export function debugTraceTransaction(blockchain: Blockchain, stateManager: State, evmConfig: ConfigOptions, traceConfig: DebugTraceConfig, blockConfig: BlockConfig, transactions: Array<PendingTransaction>, transactionHash: Buffer): Promise<DebugTraceResult>
/** Get trace output for `debug_traceTransaction` */
export function debugTraceCall(blockchain: Blockchain, stateManager: State, evmConfig: ConfigOptions, traceConfig: DebugTraceConfig, blockConfig: BlockConfig, transaction: TransactionRequest): Promise<DebugTraceResult>
export interface DebugTraceConfig {
  disableStorage?: boolean
  disableMemory?: boolean
  disableStack?: boolean
}
export interface DebugTraceResult {
  pass: boolean
  gasUsed: bigint
  output?: Buffer
  structLogs: Array<DebugTraceLogItem>
}
export interface DebugTraceLogItem {
  /** Program Counter */
  pc: bigint
  op: number
  /** Gas left before executing this operation as hex number. */
  gas: string
  /** Gas cost of this operation as hex number. */
  gasCost: string
  /** Array of all values (hex numbers) on the stack */
  stack?: Array<string>
  /** Depth of the call stack */
  depth: bigint
  /** Size of memory array */
  memSize: bigint
  /** Name of the operation */
  opName: string
  /** Description of an error as a hex string. */
  error?: string
  /** Array of all allocated values as hex strings. */
  memory?: Array<string>
  /** Map of all stored values with keys and values encoded as hex strings. */
  storage?: Record<string, string>
}
/** Ethereum execution log. */
export interface ExecutionLog {
  address: Buffer
  topics: Array<Buffer>
  data: Buffer
}
/**The type of ordering to use when selecting blocks to mine. */
export const enum MineOrdering {
  /**Insertion order */
  Fifo = 'Fifo',
  /**Effective miner fee */
  Priority = 'Priority'
}
/** Mines a block using as many transactions as can fit in it. */
export function mineBlock(blockchain: Blockchain, stateManager: State, memPool: MemPool, config: ConfigOptions, timestamp: bigint, beneficiary: Buffer, minGasPrice: bigint, mineOrdering: MineOrdering, reward: bigint, baseFee?: bigint | undefined | null, prevrandao?: Buffer | undefined | null): Promise<MineBlockResult>
/** Executes the provided transaction without changing state. */
export function dryRun(blockchain: Blockchain, stateManager: State, cfg: ConfigOptions, transaction: TransactionRequest, block: BlockConfig, withTrace: boolean): Promise<TransactionResult>
/** Executes the provided transaction without changing state, ignoring validation checks in the process. */
export function guaranteedDryRun(blockchain: Blockchain, stateManager: State, cfg: ConfigOptions, transaction: TransactionRequest, block: BlockConfig, withTrace: boolean): Promise<TransactionResult>
/** Executes the provided transaction, changing state in the process. */
export function run(blockchain: Blockchain, stateManager: State, cfg: ConfigOptions, transaction: TransactionRequest, block: BlockConfig, withTrace: boolean): Promise<TransactionResult>
export interface Signature {
  /** R value */
  r: bigint
  /** S value */
  s: bigint
  /** V value */
  v: bigint
}
export interface TracingMessage {
  /** Recipient address. None if it is a Create message. */
  readonly to?: Buffer
  /** Depth of the message */
  readonly depth: number
  /** Input data of the message */
  readonly data: Buffer
  /** Value sent in the message */
  readonly value: bigint
  /**
   * Address of the code that is being executed. Can be different from `to` if a delegate call
   * is being done.
   */
  readonly codeAddress?: Buffer
  /** Code of the contract that is being executed. */
  readonly code?: Buffer
}
export interface TracingStep {
  /** Call depth */
  readonly depth: number
  /** The program counter */
  readonly pc: bigint
  /** The executed op code */
  readonly opcode: string
  /** The top entry on the stack. None if the stack is empty. */
  readonly stackTop?: bigint
}
export interface TracingMessageResult {
  /** Execution result */
  readonly executionResult: ExecutionResult
}
export interface TransactionRequest {
  /**
   * 160-bit address for caller
   * Defaults to `0x00.0` address.
   */
  from?: Buffer
  /**
   * 160-bit address for receiver
   * Creates a contract if no address is provided.
   */
  to?: Buffer
  /**
   * Maximum gas allowance for the code execution to avoid infinite loops.
   * Defaults to 2^63.
   */
  gasLimit?: bigint
  /**
   * Number of wei to pay for each unit of gas during execution.
   * Defaults to 1 wei.
   */
  gasPrice?: bigint
  /** Maximum tip per gas that's given directly to the forger. */
  gasPriorityFee?: bigint
  /** (Up to) 256-bit unsigned value. */
  value?: bigint
  /** Nonce of sender account. */
  nonce?: bigint
  /** Input byte data */
  input?: Buffer
  /** A list of addresses and storage keys that the transaction plans to access. */
  accessList?: Array<AccessListItem>
  /** Transaction is only valid on networks with this chain ID. */
  chainId?: bigint
}
/** The possible reasons for successful termination of the EVM. */
export const enum SuccessReason {
  /** The opcode `STOP` was called */
  Stop = 0,
  /** The opcode `RETURN` was called */
  Return = 1,
  /** The opcode `SELFDESTRUCT` was called */
  SelfDestruct = 2
}
export interface CallOutput {
  /** Return value */
  returnValue: Buffer
}
export interface CreateOutput {
  /** Return value */
  returnValue: Buffer
  /** Optionally, a 160-bit address */
  address?: Buffer
}
/** The result when the EVM terminates successfully. */
export interface SuccessResult {
  /** The reason for termination */
  reason: SuccessReason
  /** The amount of gas used */
  gasUsed: bigint
  /** The amount of gas refunded */
  gasRefunded: bigint
  /** The logs */
  logs: Array<ExecutionLog>
  /** The transaction output */
  output: CallOutput | CreateOutput
}
/** The result when the EVM terminates due to a revert. */
export interface RevertResult {
  /** The amount of gas used */
  gasUsed: bigint
  /** The transaction output */
  output: Buffer
}
/**
 * Indicates that the EVM has experienced an exceptional halt. This causes execution to
 * immediately end with all gas being consumed.
 */
export const enum ExceptionalHalt {
  OutOfGas = 0,
  OpcodeNotFound = 1,
  InvalidFEOpcode = 2,
  InvalidJump = 3,
  NotActivated = 4,
  StackUnderflow = 5,
  StackOverflow = 6,
  OutOfOffset = 7,
  CreateCollision = 8,
  PrecompileError = 9,
  NonceOverflow = 10,
  /** Create init code size exceeds limit (runtime). */
  CreateContractSizeLimit = 11,
  /** Error on created contract that begins with EF */
  CreateContractStartingWithEF = 12,
  /** EIP-3860: Limit and meter initcode. Initcode size limit exceeded. */
  CreateInitcodeSizeLimit = 13
}
/** The result when the EVM terminates due to an exceptional halt. */
export interface HaltResult {
  /** The exceptional halt that occurred */
  reason: ExceptionalHalt
  /** Halting will spend all the gas and will thus be equal to the specified gas limit */
  gasUsed: bigint
}
/** The result of executing a transaction. */
export interface ExecutionResult {
  /** The transaction result */
  result: SuccessResult | RevertResult | HaltResult
}
export interface Eip1559SignedTransaction {
  chainId: bigint
  nonce: bigint
  maxPriorityFeePerGas: bigint
  maxFeePerGas: bigint
  gasLimit: bigint
  /**
   * 160-bit address for receiver
   * Creates a contract if no address is provided.
   */
  to?: Buffer
  value: bigint
  input: Buffer
  accessList: Array<AccessListItem>
  oddYParity: boolean
  r: bigint
  s: bigint
}
export interface Eip2930SignedTransaction {
  chainId: bigint
  nonce: bigint
  gasPrice: bigint
  gasLimit: bigint
  /**
   * 160-bit address for receiver
   * Creates a contract if no address is provided.
   */
  to?: Buffer
  value: bigint
  input: Buffer
  accessList: Array<AccessListItem>
  oddYParity: boolean
  r: bigint
  s: bigint
}
export interface Eip4844SignedTransaction {
  chainId: bigint
  nonce: bigint
  maxPriorityFeePerGas: bigint
  maxFeePerGas: bigint
  maxFeePerBlobGas: bigint
  gasLimit: bigint
  /** 160-bit address for receiver */
  to: Buffer
  value: bigint
  input: Buffer
  accessList: Array<AccessListItem>
  blobHashes: Array<Buffer>
  oddYParity: boolean
  r: bigint
  s: bigint
}
export interface LegacySignedTransaction {
  nonce: bigint
  gasPrice: bigint
  gasLimit: bigint
  /**
   * 160-bit address for receiver
   * Creates a contract if no address is provided.
   */
  to?: Buffer
  value: bigint
  input: Buffer
  signature: Signature
}
export interface TransactionConfig {
  disableBalanceCheck?: boolean
}
export interface Withdrawal {
  /** The index of withdrawal */
  index: bigint
  /** The index of the validator that generated the withdrawal */
  validatorIndex: bigint
  /** The recipient address for withdrawal value */
  address: Buffer
  /** The value contained in withdrawal */
  amount: bigint
}
export class BlockBuilder {
  static create(blockchain: Blockchain, stateManager: State, config: ConfigOptions, parent: BlockHeader, block: BlockOptions): Promise<BlockBuilder>
  /** Retrieves the amount of gas used by the builder. */
  get gasUsed(): Promise<bigint>
  addTransaction(transaction: PendingTransaction, withTrace: boolean): Promise<TransactionResult>
  /**
   * This call consumes the [`BlockBuilder`] object in Rust. Afterwards, you can no longer call
   * methods on the JS object.
   */
  finalize(rewards: Array<[Buffer, bigint]>, timestamp?: bigint | undefined | null): Promise<Block>
}
export class Block {
  /**Retrieves the block's hash, potentially calculating it in the process. */
  hash(): Buffer
  /**Retrieves the block's header. */
  get header(): BlockHeader
  /**Retrieves the block's transactions. */
  get transactions(): Array<LegacySignedTransaction | EIP2930SignedTransaction | EIP1559SignedTransaction | Eip4844SignedTransaction>
  /**Retrieves the callers of the block's transactions */
  get callers(): Array<Buffer>
  /**Retrieves the transactions' receipts. */
  receipts(): Promise<Array<Receipt>>
}
/** The Rethnet blockchain */
export class Blockchain {
  /** Constructs a new blockchain from a genesis block. */
  static withGenesisBlock(chainId: bigint, specId: SpecId, genesisBlock: BlockOptions, accounts: Array<GenesisAccount>): Blockchain
  static fork(context: RethnetContext, specId: SpecId, remoteUrl: string, forkBlockNumber: bigint | undefined | null, cacheDir: string | undefined | null, accounts: Array<GenesisAccount>, hardforkActivationOverrides: Array<[bigint, Array<[bigint, SpecId]>]>): Promise<Blockchain>
  /**Retrieves the block with the provided hash, if it exists. */
  blockByHash(hash: Buffer): Promise<Block | null>
  /**Retrieves the block with the provided number, if it exists. */
  blockByNumber(number: bigint): Promise<Block | null>
  /**Retrieves the block that contains a transaction with the provided hash, if it exists. */
  blockByTransactionHash(transactionHash: Buffer): Promise<Block | null>
  /**Retrieves the instance's chain ID. */
  chainId(): Promise<bigint>
  /**Retrieves the last block in the blockchain. */
  lastBlock(): Promise<Block>
  /**Retrieves the number of the last block in the blockchain. */
  lastBlockNumber(): Promise<bigint>
  /**Retrieves the receipt of the transaction with the provided hash, if it exists. */
  receiptByTransactionHash(transactionHash: Buffer): Promise<Receipt | null>
  /**Reserves the provided number of blocks, starting from the next block number. */
  reserveBlocks(additional: bigint, interval: bigint): Promise<void>
  /**Reverts to the block with the provided number, deleting all later blocks. */
  revertToBlock(blockNumber: bigint): Promise<void>
  /**Retrieves the hardfork specficiation of the block at the provided number. */
  specAtBlockNumber(blockNumber: bigint): Promise<SpecId>
  /**Retrieves the hardfork specification used for new blocks. */
  specId(): Promise<SpecId>
  /**Retrieves the state at the block with the provided number. */
  stateAtBlockNumber(blockNumber: bigint): Promise<State>
  /**Retrieves the total difficulty at the block with the provided hash. */
  totalDifficultyByHash(hash: Buffer): Promise<bigint | null>
}
/** A wrapper type around Rethnet's EVM config type. */
export class Config {
  /** Retrieves the configs contract code size limit */
  get limitContractCodeSize(): bigint | null
  /** Returns whether the block gas limit is disabled. */
  get disableBlockGasLimit(): boolean
  /** Returns whether EIP-3607 is disabled. */
  get disableEip3607(): boolean
}
export class RethnetContext {
  /**Creates a new [`RethnetContext`] instance. Should only be called once! */
  constructor()
  /**Overwrites the next value generated by the state root generator with the provided seed. */
  setStateRootGeneratorSeed(seed: Buffer): void
}
/** Ethereum log. */
export class Log {
  /**Returns the address of the log's originator. */
  get address(): Buffer
  /**Returns the hash of the block the log is included in. */
  get blockHash(): Buffer | null
  /**Returns the number of the block the log is included in. */
  get blockNumber(): bigint | null
  /**Returns the data of the log. */
  get data(): Buffer
  /**Returns the index of the log within the block. */
  get logIndex(): bigint | null
  /**Returns whether the log was removed. */
  get removed(): boolean
  /**Returns the topics of the log. */
  get topics(): Array<Buffer>
  /**Returns the hash of the transaction the log is included in. */
  get transactionHash(): Buffer | null
  /**Returns the index of the transaction the log is included in. */
  get transactionIndex(): bigint | null
}
/** The mempool contains transactions pending inclusion in the blockchain. */
export class MemPool {
  /**Constructs a new [`MemPool`]. */
  constructor(blockGasLimit: bigint)
  /**Creates a deep clone of the [`MemPool`]. */
  deepClone(): Promise<MemPool>
  /**Retrieves the instance's block gas limit. */
  blockGasLimit(): Promise<bigint>
  /**Sets the instance's block gas limit. */
  setBlockGasLimit(blockGasLimit: bigint): Promise<void>
  /**Retrieves the last pending nonce of the account corresponding to the specified address, if it exists. */
  lastPendingNonce(address: Buffer): Promise<bigint | null>
  /**Tries to add the provided transaction to the instance. */
  addTransaction(stateManager: State, transaction: PendingTransaction): Promise<void>
  /**Removes the transaction corresponding to the provided hash, if it exists. */
  removeTransaction(hash: Buffer): Promise<boolean>
  /**Updates the instance, moving any future transactions to the pending status, if their nonces are high enough. */
  update(stateManager: State): Promise<void>
  /**Returns all transactions in the mem pool. */
  transactions(): Promise<Array<PendingTransaction>>
  /**Returns whether the [`MemPool`] contains any future transactions. */
  hasFutureTransactions(): Promise<boolean>
  /**Returns whether the [`MemPool`] contains any pending transactions. */
  hasPendingTransactions(): Promise<boolean>
  /**Returns the transaction corresponding to the provided hash, if it exists. */
  transactionByHash(hash: Buffer): Promise<OrderedTransaction | null>
}
export class MineBlockResult {
  /**Retrieves the mined block. */
  get block(): Block
  /** */
  get state(): State
  /**Retrieves the transactions' results. */
  get results(): Array<ExecutionResult>
  /**Retrieves the transactions' traces. */
  get traces(): Array<Array<TracingMessage | TracingStep | TracingMessageResult>>
}
export class Receipt {
  /**Returns the hash of the block the receipt is included in. */
  get blockHash(): Buffer
  /**Returns the number of the block the receipt is included in. */
  get blockNumber(): bigint
  /**Return the address of the transaction's receiver, if any. */
  get callee(): Buffer | null
  /**Returns the address of the transaction's sender. */
  get caller(): Buffer
  /**Returns the address of a created contract, if any. */
  get contractAddress(): Buffer | null
  /**Returns the cumulative gas used after this transaction was executed. */
  get cumulativeGasUsed(): bigint
  /**Returns the gas used by the receipt's transaction. */
  get gasUsed(): bigint
  get logs(): Array<Log>
  /**Returns the bloom filter of the receipt's logs. */
  get logsBloom(): Buffer
  /**Returns the effective gas price of the receipt's transaction. */
  get effectiveGasPrice(): bigint
  /**
   *Returns the state root of the receipt, if any.
   *Only available for pre-Byzantium receipts. For Byzantium receipts, use `status` instead.
   */
  get stateRoot(): Buffer | null
  /**
   *Returns the status code of the receipt, if any.
   *Only available for post-Byzantium receipts. For pre-Byzantium receipts, use `stateRoot` instead.
   */
  get status(): number | null
  /**Returns the type of the receipt's transaction. */
  get type(): bigint
  /**Returns the hash of the receipt's transaction. */
  get transactionHash(): Buffer
  /**Returns the index of the receipt's transaction in the block. */
  get transactionIndex(): bigint
}
/** The Rethnet state */
export class State {
  /** Constructs a [`State`] with an empty state. */
  constructor()
  /** Constructs a [`State`] with the provided accounts present in the genesis state. */
  static withGenesisAccounts(accounts: Array<GenesisAccount>): State
  /**
   * Constructs a [`State`] that uses the remote node and block number as the basis for
   * its state.
   */
  static forkRemote(context: RethnetContext, remoteNodeUrl: string, forkBlockNumber: bigint, accountOverrides: Array<GenesisAccount>, cacheDir?: string | undefined | null): Promise<State>
  /**Clones the state */
  deepClone(): Promise<State>
  /** Retrieves the account corresponding to the specified address. */
  getAccountByAddress(address: Buffer): Promise<Account | null>
  /** Retrieves the storage root of the account at the specified address. */
  getAccountStorageRoot(address: Buffer): Promise<Buffer | null>
  /** Retrieves the storage slot at the specified address and index. */
  getAccountStorageSlot(address: Buffer, index: bigint): Promise<bigint>
  /** Retrieves the storage root of the database. */
  getStateRoot(): Promise<Buffer>
  /** Inserts the provided account at the specified address. */
  insertAccount(address: Buffer, account: Account): Promise<void>
  /**
   * Modifies the account with the provided address using the specified modifier function.
   * The modifier function receives the current values as individual parameters and will update the account's values
   * to the returned `Account` values.
   */
  modifyAccount(address: Buffer, modifyAccountFn: (balance: bigint, nonce: bigint, code: Bytecode | undefined) => Promise<Account>): Promise<void>
  /** Removes and returns the account at the specified address, if it exists. */
  removeAccount(address: Buffer): Promise<Account | null>
  /** Serializes the state using ordering of addresses and storage indices. */
  serialize(): Promise<string>
  /** Sets the storage slot at the specified address and index to the provided value. */
  setAccountStorageSlot(address: Buffer, index: bigint, value: bigint): Promise<void>
}
export class OrderedTransaction {
  get transaction(): PendingTransaction
  get orderId(): bigint
}
export class PendingTransaction {
  /** Tries to construct a new [`PendingTransaction`]. */
  static create(stateManager: State, specId: SpecId, transaction: LegacySignedTransaction | EIP2930SignedTransaction | EIP1559SignedTransaction | Eip4844SignedTransaction, caller?: Buffer | undefined | null): Promise<PendingTransaction>
  get caller(): Buffer
  get transaction(): LegacySignedTransaction | EIP2930SignedTransaction | EIP1559SignedTransaction | Eip4844SignedTransaction
}
export class TransactionResult {
  get result(): ExecutionResult
  get state(): any | null
  get trace(): Array<TracingMessage | TracingStep | TracingMessageResult> | null
}
