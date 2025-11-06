import { describe, expect, test } from "vitest";
import { fn } from "./dspy-x.js";
import { llama2Model } from "./models/llama2-model.js";
describe('answer with a number', () => {
    const questionFn = fn(llama2Model, {
        action: 'answer the question with a number',
        inputs: [{
                name: 'question'
            }],
        outputs: [{
                name: 'answer',
                type: 'number'
            }, {
                name: 'reason'
            }]
    });
    test('cats in a litter', async () => {
        const response = await questionFn.call({ question: "How many cats are in a typical litter?" });
        // console.log(response);
        expect(Object.keys(response.data)).toEqual(expect.arrayContaining(['answer', 'reason']));
        expect(response.data.answer).toMatch(/\d/);
    });
    test('simple maths', async () => {
        const response = await questionFn.call({ question: "What is 4+5?" });
        // console.log(response);
        expect(Object.keys(response.data)).toEqual(expect.arrayContaining(['answer', 'reason']));
        expect(response.data.answer).toMatch(/\d/);
        expect(response.data.answer).toBe('9');
    });
});
describe.only('test answer matches question', () => {
    const testFn = fn(llama2Model, {
        action: 'confirm the answer is correct for the question ',
        inputs: [{
                name: 'question'
            },
            {
                name: 'answer'
            }],
        outputs: [{
                name: 'result',
                type: 'Yes or No',
            }, {
                name: 'rationale'
            }]
    });
    test('cats in a litter', async () => {
        const response = await testFn.call({
            answer: 'dog',
            question: "What is 4+5?"
        });
        console.log(response);
        expect(response.data.result).toBe('No');
    });
});
//# sourceMappingURL=example.test.js.map