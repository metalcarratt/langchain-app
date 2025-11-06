export const validateUserInput = (signature, userInput) => {
    for (let input of signature.inputs) {
        if (!userInput[input.name]) {
            throw new Error(`User input does not contain a value for key '${input.name}'`);
        }
    }
};
//# sourceMappingURL=validate-user-input.js.map