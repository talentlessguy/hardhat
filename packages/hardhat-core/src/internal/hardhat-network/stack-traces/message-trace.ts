import type {
  PrecompileMessageTrace,
  CreateMessageTrace,
  CallMessageTrace,
} from "@nomicfoundation/edr";

export { PrecompileMessageTrace, CreateMessageTrace, CallMessageTrace };

export type MessageTrace =
  | CreateMessageTrace
  | CallMessageTrace
  | PrecompileMessageTrace;

// WIP: Remove all of these once the feature branch is bumped above HH v2.22.6
export type EvmMessageTrace = CreateMessageTrace | CallMessageTrace;
export function isPrecompileTrace(
  trace: MessageTrace
): trace is PrecompileMessageTrace {
  return "precompile" in trace;
}

export function isCallTrace(trace: MessageTrace): trace is CallMessageTrace {
  return "code" in trace && "calldata" in trace;
}

export interface EvmStep {
  pc: number;
}

export type MessageTraceStep = MessageTrace | EvmStep;
export function isEvmStep(step: MessageTraceStep): step is EvmStep {
  return "pc" in step && step.pc !== undefined;
}
