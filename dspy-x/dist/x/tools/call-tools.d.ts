import z from "zod";
import type { InputSchema, Model, OutputSchema, Signature } from "../types.js";
import type { DebugCollector } from '../debug/debug-collector.js';
import type { Tool } from "./types.js";
export declare const callTools: <I extends InputSchema, O extends OutputSchema>(model: Model, signature: Signature<I, O>, userInput: z.infer<I>, tools: Tool<any, any>[], debugCollector: DebugCollector, toolContext?: string, layers?: number) => Promise<string>;
//# sourceMappingURL=call-tools.d.ts.map