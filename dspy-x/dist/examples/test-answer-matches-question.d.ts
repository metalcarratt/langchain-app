import z from "zod";
export declare const answerMatchSchema: {
    action: string;
    inputs: z.ZodObject<{
        question: z.ZodString;
        answer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        question: string;
        answer: string;
    }, {
        question: string;
        answer: string;
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
export declare const answerMatchFn: (input: {
    question: string;
    answer: string;
}, debug?: boolean) => Promise<{
    prompt: string;
    raw: string;
    data: {
        result: boolean;
        rationale: string;
    };
}>;
//# sourceMappingURL=test-answer-matches-question.d.ts.map