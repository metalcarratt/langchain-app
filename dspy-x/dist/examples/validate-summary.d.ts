import z from "zod";
export declare const schema: {
    action: string;
    inputs: z.ZodObject<{
        summary: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
        summary: string;
    }, {
        text: string;
        summary: string;
    }>;
    outputs: z.ZodObject<{
        result: z.ZodBoolean;
        rationale: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        result: boolean;
        rationale: string;
    }, {
        result: boolean;
        rationale: string;
    }>;
};
export declare const validateSummary: (input: {
    text: string;
    summary: string;
}, debug?: boolean) => Promise<{
    prompt: string;
    raw: string;
    data: {
        result: boolean;
        rationale: string;
    };
}>;
//# sourceMappingURL=validate-summary.d.ts.map