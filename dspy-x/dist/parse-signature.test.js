import { describe, it, expect } from 'vitest';
import { parseSignature } from './parse-signature.js';
describe('parseSignature', () => {
    it('should correctly infer input and output with default type', () => {
        const response = parseSignature('question => answer');
        expect(response.inputs[0]?.name).toBe('question');
        expect(response.inputs[0]?.type).toBe('string');
        expect(response.outputs[0]?.name).toBe('answer');
        expect(response.outputs[0]?.type).toBe('string');
    });
    it('should correctly infer multiple inputs and outputs', () => {
        const response = parseSignature('question, context => answer, explanation');
        expect(response.inputs[0]?.name).toBe('question');
        expect(response.inputs[1]?.name).toBe('context');
        expect(response.outputs[0]?.name).toBe('answer');
        expect(response.outputs[1]?.name).toBe('explanation');
    });
    it('should correctly infer types', () => {
        const response = parseSignature('question: number => answer: boolean');
        expect(response.inputs[0]?.name).toBe('question');
        expect(response.inputs[0]?.type).toBe('number');
        expect(response.outputs[0]?.name).toBe('answer');
        expect(response.outputs[0]?.type).toBe('boolean');
    });
    it('should correctly infer types', () => {
        const response = parseSignature('question: number => answer: boolean');
        expect(response.inputs[0]?.name).toBe('question');
        expect(response.inputs[0]?.type).toBe('number');
        expect(response.outputs[0]?.name).toBe('answer');
        expect(response.outputs[0]?.type).toBe('boolean');
    });
    // it('should reject invalid signatures', async () => {
    //     await expect(parseSignature(': number => answer')).rejects.toThrow(ERROR_NO_INPUTS);
    // });
});
//# sourceMappingURL=parse-signature.test.js.map