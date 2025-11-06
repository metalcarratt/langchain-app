import type z from "zod";
import { firstLetterUppercase } from "../util.js";
import type { InputSchema, OutputSchema, Signature } from "../types.js";

export const printInputs = <I extends InputSchema, O extends OutputSchema>(
    signature: Signature<I, O>,
    userInput: z.infer<I>
) => {
    const listOfInputs = Object.keys(signature.inputs.shape)
        .map(inputName => printInput(inputName, userInput))
        .join('\n');

    return `
'''
${listOfInputs}
'''
    `;
}

const printInput = (inputName: string, userInput: Record<string, string>) => {
    const upperKey = firstLetterUppercase(inputName);
    const userValue = userInput[inputName];
    return `${upperKey}: ${userValue}`;
}