import { firstLetterUppercase } from "../util.js";
export const printInputs = (signature, userInput) => {
    const listOfInputs = Object.keys(signature.inputs.shape)
        .map(inputName => printInput(inputName, userInput))
        .join('\n');
    return `
'''
${listOfInputs}
'''
    `;
};
const printInput = (inputName, userInput) => {
    const upperKey = firstLetterUppercase(inputName);
    const userValue = userInput[inputName];
    return `${upperKey}: ${userValue}`;
};
//# sourceMappingURL=print-inputs.js.map