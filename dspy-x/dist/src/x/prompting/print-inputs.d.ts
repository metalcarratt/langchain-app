import type z from "zod";
import type { InputSchema, OutputSchema, Signature } from "../types.js";
export declare const printInputs: <I extends InputSchema, O extends OutputSchema>(signature: Signature<I, O>, userInput: z.infer<I>) => string;
//# sourceMappingURL=print-inputs.d.ts.map