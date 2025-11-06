import { z, ZodObject, type ZodRawShape, type ZodTypeAny } from "zod";
export type ToolSignature<I, O> = {
    input: I;
    output: O;
};
export type ToolInput = ZodObject<ZodRawShape>;
export type ToolOutput = ZodTypeAny;
export type Tool<I extends ToolInput, O extends ToolOutput> = {
    name: string;
    instruct: string;
    deterministic: boolean;
    signature: ToolSignature<I, O>;
    call: (arg: z.infer<I>) => z.infer<O>;
};
//# sourceMappingURL=types.d.ts.map