import { firstLetterUppercase } from "./util.js";
import { ZodBoolean, ZodEnum, ZodNumber, ZodObject } from "zod";
export const parseResponse = (response, outputSignature) => {
    const outputs = Object.entries(outputSignature.shape);
    const lines = response.split('\n');
    const result = {};
    for (const [key, schema] of outputs) {
        const upperKey = firstLetterUppercase(key);
        const match = lines.find(line => line.includes(`${upperKey}:`));
        if (match) {
            const value = match.slice(key.length + 1).trim();
            const parsedValue = parseValueForType(value, schema);
            result[key] = parsedValue;
        }
    }
    return outputSignature.parse(result);
};
const parseValueForType = (value, valueSchema) => {
    console.log(`In parseValueForType. value: ${value}.`);
    if (valueSchema instanceof ZodNumber) {
        console.log('is ZodNumber');
        return Number(value);
    }
    if (valueSchema instanceof ZodBoolean) {
        console.log('is ZodBoolean');
        if (value === 'True') {
            return true;
        }
        else if (value === 'False') {
            return false;
        }
    }
    if (valueSchema instanceof ZodEnum) {
        console.log('value is an ZodEnum');
        const enumValues = valueSchema.options;
        const match = enumValues.find((e) => typeof e === 'string' && e.toLowerCase() === value.toLowerCase());
        // console.log('got match', match);
        if (!match) {
            return value;
        }
        return match;
    }
    if (valueSchema instanceof ZodObject) {
        console.log('value is an ZodObject');
        return JSON.parse(value);
    }
    console.log('value is string or unknown', valueSchema._def.typeName);
    return value;
};
//# sourceMappingURL=parse-response.js.map