import type { Signature } from "./signature.js";
export type Model = {
    call: (prompt: string) => Promise<string>;
};
export declare const fn: (model: Model, sig: Signature) => (input: Record<string, string>, debug?: boolean) => Promise<{
    prompt: string;
    raw: string;
    data: Record<string, string>;
}>;
//# sourceMappingURL=dspy-x.d.ts.map