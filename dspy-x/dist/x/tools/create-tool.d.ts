import z from "zod";
import type { Tool, ToolInput, ToolOutput, ToolSignature } from "./types.js";
export declare const createTool: <I extends ToolInput, O extends ToolOutput>({ name, instruct, deterministic, signature: sig, call }: {
    name: string;
    instruct: string;
    deterministic: boolean;
    signature?: ToolSignature<I, O>;
    call: (arg: z.infer<I>) => z.infer<O>;
}) => Tool<I, O>;
//# sourceMappingURL=create-tool.d.ts.map