import { printOutputs } from "./prompting/print-outputs.js";
import { printInputs } from "./prompting/print-inputs.js";
import { printExamples } from "./prompting/print-examples.js";
export const createPrompt = (signature, userInput, examples, toolContext, debug) => {
    const prompt = `
Your task is to ${signature.action}

Given the following input in triple quotes:
${printInputs(signature, userInput)}

Respond with exactly the following format in triple quotes:
${printOutputs(signature)}

${toolContext ? 'You have been provided with the following context: ' + toolContext : ''}

${examples ? printExamples(examples) : ''}
    `;
    // Do not include any additional explanation, commentary, or alternative phrasing.
    // Only output in the format above.
    if (debug)
        console.log('prompt', prompt);
    return prompt;
};
//# sourceMappingURL=create-prompt.js.map