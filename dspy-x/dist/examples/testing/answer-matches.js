import z from "zod";
import { llama3Model } from "../../models/llama3-model.js";
import { fn } from "../../x/dspy-x.js";
export const answerMatchesSchema = {
    action: 'confirm the answer makes sense for the question (whether it is correct or not)',
    inputs: z.object({
        question: z.string(),
        answer: z.string()
    }),
    outputs: z.object({
        result: z.boolean(),
        rationale: z.string()
    }),
};
const examples = [{
        given: {
            question: 'Is it cloudy outside?',
            answer: 'I like ice cream'
        },
        expect: {
            result: false,
            rationale: 'the question is about weather but the answer is about food'
        }
    }];
export const answerMatches = fn(llama3Model, answerMatchesSchema, examples);
//# sourceMappingURL=answer-matches.js.map