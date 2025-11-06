import type { ChatOllama } from "@langchain/ollama";
import type { Signature } from "./parse-signature.js";
export declare const queryModel: (model: ChatOllama, signature: Signature, input: string) => Promise<Record<string, string>>;
//# sourceMappingURL=query-model.d.ts.map