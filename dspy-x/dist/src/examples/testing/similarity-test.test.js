import { describe, expect, test } from "vitest";
import { similarityTestFn } from "./similarity-test.js";
describe.skip('similarity test', () => {
    test('Greetings in English', async () => {
        const response = await similarityTestFn({
            provided: 'Good morning',
            expected: "Hello"
        });
        console.log(response);
        expect(response.data.result).toBe(true);
    });
    test('A word and a number', async () => {
        const response = await similarityTestFn({
            provided: '9',
            expected: "dog"
        });
        // console.log(response);
        expect(response.data.result).toBe(false);
    });
}, 10000);
//# sourceMappingURL=similarity-test.test.js.map