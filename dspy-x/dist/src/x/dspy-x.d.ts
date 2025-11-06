import type z from "zod";
import type { InputSchema, Model, OutputSchema, Signature } from "./types.js";
export declare const fn: <I extends InputSchema, O extends OutputSchema>(model: Model, sig: Signature<I, O>, examples?: {
    given: z.infer<I>;
    expect: z.infer<O>;
    incorrect?: string;
}[]) => (input: z.TypeOf<I>, debug?: boolean) => Promise<{
    prompt: string;
    raw: string;
    data: z.TypeOf<O>;
}>;
//# sourceMappingURL=dspy-x.d.ts.map