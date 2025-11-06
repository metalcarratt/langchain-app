import { firstLetterUppercase } from "../util.js";
import { ZodBoolean, ZodEnum, ZodNumber } from "zod";
export const printOutputs = (signature) => {
    const listOfOutputs = Object.entries(signature.outputs.shape)
        .map(([outputName, outputSchema]) => printOutput(outputName, outputSchema))
        .join('\n');
    return `
'''
${listOfOutputs}
'''    
    `;
};
const printOutput = (outputName, outputSchema) => {
    const typeDesc = getTypeDesc(outputSchema);
    const name = firstLetterUppercase(outputName);
    const desc = outputName + typeDesc;
    return `${name}: [${desc}]`;
};
const getTypeDesc = (outputSchema) => {
    const description = outputSchema.description ? ` - ${outputSchema.description}` : '';
    if (outputSchema instanceof ZodNumber) {
        return ` as a number only${description}`;
    }
    if (outputSchema instanceof ZodBoolean) {
        return ` as True or False only${description}`;
    }
    if (outputSchema instanceof ZodEnum) {
        return ` as one of ${JSON.stringify(outputSchema.options)} only${description}`;
    }
    return '';
};
//# sourceMappingURL=print-outputs.js.map