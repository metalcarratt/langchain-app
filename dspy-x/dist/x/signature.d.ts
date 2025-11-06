import type { Tool } from "./dspy-x.js";
export type Signature<I, O> = {
    action: string;
    inputs: I;
    outputs: O;
    examples?: {
        input: I;
        output: O;
    }[];
    tools?: Tool[];
};
//# sourceMappingURL=signature.d.ts.map