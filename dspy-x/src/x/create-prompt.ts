import type z from "zod";
import { printOutputs } from "./prompting/print-outputs.js";
import { printInputs } from "./prompting/print-inputs.js";
import { printExamples } from "./prompting/print-examples.js";
import type { InputSchema, OutputSchema, Signature } from "./types.js";

export const createPrompt = <I extends InputSchema, O extends OutputSchema>(
    signature: Signature<I, O>,
    userInput: z.infer<I>,
    examples?: {given: z.infer<I>, expect: z.infer<O>, incorrect?: string}[],
    toolContext?: string,
    debug?: boolean
) => {
    const prompt = `
Your task is to ${signature.action}

Given the following input in triple quotes:
${printInputs(signature, userInput)}

Respond with exactly the following format in triple quotes:
${printOutputs(signature)}

${toolContext ? 'You have been provided with the following context: ' + toolContext : ''}

${examples ? printExamples<I, O>(examples) : ''}
    `;

// Do not include any additional explanation, commentary, or alternative phrasing.
// Only output in the format above.

    if (debug) console.log('prompt', prompt);
    return prompt;
}