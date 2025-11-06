import { describe, expect, test } from "vitest";
import { answerMatches } from "./answer-matches.js";
describe.skip('test answer matches question', () => {
    test('number as answer to maths question', async () => {
        const response = await answerMatches({
            answer: '9',
            question: "What is 4+5?"
        });
        console.log(response);
        expect(response.data.result).toBe(true);
    });
    test('dog as answer to maths question', async () => {
        const response = await answerMatches({
            answer: 'dog',
            question: "What is 4+5?"
        });
        // console.log(response);
        expect(response.data.result).toBe(false);
    });
}, 10000);
//# sourceMappingURL=answer-matches.test.js.map