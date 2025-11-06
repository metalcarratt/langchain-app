export const parseSignature = (signature) => {
    const [inputPart, outputPart] = signature.split('=>').map(s => s.trim());
    const inputs = inputPart?.split(',').map(s => mapVar(s));
    const outputs = outputPart?.split(',').map(s => mapVar(s));
    return {
        inputs,
        outputs
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
//# sourceMappingURL=signature-parser.js.map