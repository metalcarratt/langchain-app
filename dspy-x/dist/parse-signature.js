export const ERROR_NO_INPUTS = 'No inputs found';
export const ERROR_INPUT_NO_NAME = 'Input without name found';
export const ERROR_NO_OUTPUTS = 'No outputs found';
export const ERROR_OUTPUT_NO_NAME = 'Output without name found';
export const parseSignature = (signature) => {
    const [inputPart, outputPart] = signature.split('=>').map(s => s.trim());
    const inputs = inputPart
        ?.split(',')
        .map(s => mapVar(s));
    if (!inputs || !inputs.length)
        throw new Error(ERROR_NO_INPUTS);
    if (inputs.some(i => i.name === undefined))
        throw new Error(ERROR_INPUT_NO_NAME);
    const outputs = outputPart
        ?.split(',')
        .map(s => mapVar(s));
    if (!outputs || !outputs.length)
        throw new Error(ERROR_NO_OUTPUTS);
    if (outputs.some(i => i.name === undefined))
        throw new Error(ERROR_OUTPUT_NO_NAME);
    return {
        inputs: inputs,
        outputs: outputs
    };
};
const mapVar = (variable) => {
    const [name, type] = variable.split(':').map(s => s.trim());
    return { name, type: type ?? 'string' };
};
// promptTemplate: (input: Record<string, string>) =>
//             inputs.map(k => `${k}: ${input[k]}`).join('\n') +
//             '\n' + outputs.map(k => `${k}:`).join('\n'),
//         parseResponse: (response: string) => {
//             const lines = response.split('\n');
//             const result: Record<string, string> = {};
//             for (const key of outputs) {
//                 const match = lines.find(line => line.startsWith(`${key}:`));
//                 if (match) result[key] = match.slice(key.length + 1).trim();
//             }
//             return result;
//         }
//# sourceMappingURL=parse-signature.js.map