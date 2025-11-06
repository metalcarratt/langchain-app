export const createPrompt = (signature, userInput, debug) => {
    const prompt = `
Given the following input in triple quotes:
'''
${signature.inputs.map(input => printUserInput2(input, userInput)).join('\n')}
'''

Your task is to ${signature.action}

Respond with exactly the following format in triple quotes:
'''
${signature.outputs.map(output => printVariableOutputInstructions(output)).join('\n')}
'''

Do not include any explanation, commentary, or alternative phrasing.
Only output in the format above.
    `;
    if (debug)
        console.log('prompt', prompt);
    return prompt;
};
const printVariableOutputInstructions = (output) => {
    const typeDesc = output.type ? ` as a ${output.type} only` : '';
    const name = output.name[0]?.toUpperCase() + output.name.slice(1);
    const desc = (output.desc ?? output.name) + typeDesc;
    return `${name}: [${desc}]`;
};
const printUserInput2 = (input, userInput) => {
    const upperKey = input.name[0]?.toUpperCase() + input.name.slice(1);
    return `${upperKey}: ${userInput[input.name]}`;
};
//# sourceMappingURL=create-prompt.js.map