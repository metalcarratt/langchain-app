import { describe, expect, test } from "vitest";
import { answerMatchFn } from "./test-answer-matches-question.js";
describe.skip('test answer matches question', () => {
    test('number as answer to maths question', async () => {
        const response = await answerMatchFn({
            answer: '9',
            question: "What is 4+5?"
        });
        // console.log(response);
        expect(response.data.result).toBe('Yes');
    });
    test('dog as answer to maths question', async () => {
        const response = await answerMatchFn({
            answer: 'dog',
            question: "What is 4+5?"
        });
        // console.log(response);
        expect(response.data.result).toBe('No');
    });
}, 10000);
//# sourceMappingURL=test-answer-matches-question.test.js.map