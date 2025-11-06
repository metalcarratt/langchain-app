import { fn } from "../../x/dspy-x.js";
import { llama3Model } from "../../models/llama3-model.js";
import z from "zod";

const schema = {
    action: 'answer the question with a number',
    inputs: z.object({
        question: z.string()
    }),
    outputs: z.object({
        answer: z.number(),
        reason: z.string()
    })
}

const examples = [{
    given: {
        question: 'What is one plus one'
    },
    expect: {
        answer: 2,
        reason: 'Because 1 + 1 = 2'
    }
}, {
    given: {
        question: 'How many people can fit in a car?'
    },
    expect: {
        answer: '5-7' as unknown as number,
        reason: 'it might be a five or 7 seater car'
    },
    incorrect: 'answer is a range, not a number'
}]

export const numberQuestionFn = fn(llama3Model, schema, examples);