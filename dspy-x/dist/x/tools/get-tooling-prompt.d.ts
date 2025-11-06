import type z from "zod";
import type { InputSchema, OutputSchema, Signature } from "../types.js";
import type { Tool } from "./types.js";
export declare const getToolingPrompt: <I extends InputSchema, O extends OutputSchema>(signature: Signature<I, O>, userInput: z.infer<I>, tools: Tool<any, any>[], toolContext?: string) => string;
//# sourceMappingURL=get-tooling-prompt.d.ts.map