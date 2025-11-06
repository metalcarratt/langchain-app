import { expect } from "vitest";
import { answerMatches } from "./answer-matches.js";
import { similarityTestFn } from "./similarity-test.js";
import { validateSummary } from "./validate-summary.js";

export const expectResponseKeys = (data: Object, keys: string[]) => {
    expect(Object.keys(data), `data object to contain keys: ${keys}`).toEqual(expect.arrayContaining(keys));
}

export const expectConsistency = async (question: string, answer?: string) => {
    const response = await answerMatches({
            answer: answer ?? '',
            question
    });
    
    expect(response.data.result, `${question} to match ${answer}`).toBe(true);
}

export const expectSimilarity = async (expected: string, provided?: string, ) => {
    const response = await similarityTestFn({
        provided: provided ?? '',
        expected
    }, true);

    console.log(response);
    
    expect(response.data.result, `${expected} to be semantically similar to ${provided}`).toBe(true);
}

export const expectValidSummary = async (summary: string, text: string) => {
    expect((await validateSummary({
        summary,
        text
    })).data.result).toBe(true);
}