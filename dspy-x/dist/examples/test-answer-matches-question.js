import { fn } from "../x/dspy-x.js";
import { llama2Model } from "../models/llama2-model.js";
import z from "zod";
// export const testFn = fn(llama2Model, {
//     action: 'confirm the answer is correct for the question ',
//     inputs: [{
//         name: 'question'
//     },
//         {
//         name: 'answer'
//     }],
//     outputs: [{
//         name: 'result',
//         type: 'Yes or No',
//     }, {
//         name: 'rationale'
//     }]
// });
export const answerMatchSchema = {
    action: 'confirm the answer is correct for the question ',
    inputs: z.object({
        question: z.string(),
        answer: z.string()
    }),
    outputs: z.object({
        result: z.boolean(),
        rationale: z.string()
    })
};
export const answerMatchFn = fn(llama2Model, answerMatchSchema);
//# sourceMappingURL=test-answer-matches-question.js.map