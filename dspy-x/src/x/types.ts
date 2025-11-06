import { type ZodObject, type ZodRawShape } from "zod";
import type { Tool } from "./tools/types.js";

export type Model = {
    call: (prompt: string) => Promise<string>;
}

export type InputSchema = ZodObject<ZodRawShape>;
export type OutputSchema = ZodObject<ZodRawShape>;

export type Signature<I, O> = {
    action: string,
    inputs: I,
    outputs: O,
    examples?: {input: I, output: O}[],
    tools?: Tool<any, any>[]
};
