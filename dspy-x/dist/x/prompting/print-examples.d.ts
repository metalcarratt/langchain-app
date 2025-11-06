import type z from "zod";
import type { InputSchema, OutputSchema } from "../types.js";
export declare const printExamples: <I extends InputSchema, O extends OutputSchema>(examples: {
    given: z.infer<I>;
    expect: z.infer<O>;
    incorrect?: string;
}[]) => string;
//# sourceMappingURL=print-examples.d.ts.map