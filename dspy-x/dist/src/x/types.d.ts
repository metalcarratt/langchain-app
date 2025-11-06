import { z, type ZodObject, type ZodRawShape } from "zod";
export type Model = {
    call: (prompt: string) => Promise<string>;
};
export type InputSchema = ZodObject<ZodRawShape>;
export type OutputSchema = ZodObject<ZodRawShape>;
declare const NoInputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
type NoInputSchemaType = typeof NoInputSchema;
export type Tool<I extends InputSchema = NoInputSchemaType> = {
    name: string;
    description: string;
    inputSchema?: I;
    call: (arg: z.infer<I>) => string;
};
export type Signature<I, O> = {
    action: string;
    inputs: I;
    outputs: O;
    examples?: {
        input: I;
        output: O;
    }[];
    tools?: Tool<any>[];
};
export {};
//# sourceMappingURL=types.d.ts.map