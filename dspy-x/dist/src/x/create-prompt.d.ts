import type z from "zod";
import type { InputSchema, OutputSchema, Signature } from "./types.js";
export declare const createPrompt: <I extends InputSchema, O extends OutputSchema>(signature: Signature<I, O>, userInput: z.infer<I>, examples?: {
    given: z.infer<I>;
    expect: z.infer<O>;
    incorrect?: string;
}[], toolContext?: string, debug?: boolean) => string;
//# sourceMappingURL=create-prompt.d.ts.map