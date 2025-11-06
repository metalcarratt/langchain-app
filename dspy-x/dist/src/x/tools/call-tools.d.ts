import z from "zod";
import type { InputSchema, Model, OutputSchema, Signature, Tool } from "../types.js";
export declare const callTools: <I extends InputSchema, O extends OutputSchema>(model: Model, signature: Signature<I, O>, userInput: z.infer<I>, tools: Tool[], toolContext?: string) => Promise<string>;
//# sourceMappingURL=call-tools.d.ts.map