import type z from "zod";
import type { InputSchema, OutputSchema } from "./types.js";
export declare const parseResponse: <I extends InputSchema, O extends OutputSchema>(response: string, outputSignature: O) => z.infer<O>;
//# sourceMappingURL=parse-response.d.ts.map