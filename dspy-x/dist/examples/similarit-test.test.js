import { describe, expect, test } from "vitest";
import { testFn } from "./test-answer-matches-question.js";
import { similarityTestFn } from "./similarity-test.js";
describe('similarity test', () => {
    test('Hello in Chinese', async () => {
        const response = await similarityTestFn.call({
            provided: '早上好 (Zǎoshang hǎo)',
            expected: "早上好"
        }, true);
        // console.log(response);
        expect(response.data.result).toBe('Yes');
    });
    test('Greetings in English', async () => {
        const response = await similarityTestFn.call({
            provided: 'Good morning',
            expected: "Hello"
        }, true);
        // console.log(response);
        expect(response.data.result).toBe('Yes');
    });
    test('A word and a number', async () => {
        const response = await similarityTestFn.call({
            provided: '9',
            expected: "dog"
        }, true);
        // console.log(response);
        expect(response.data.result).toBe('Yes');
    });
});
//# sourceMappingURL=similarit-test.test.js.map