import { firstLetterUppercase } from "./util.js";
import { ZodBoolean, ZodEnum, ZodNumber, ZodObject, ZodOptional } from "zod";
import { ZodRecord } from "zod/v4";
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
    const unwrappedSchema = valueSchema instanceof ZodOptional ? valueSchema.unwrap() : valueSchema;
    const schemaType = unwrappedSchema._def.typeName;
    if (schemaType === 'ZodNumber') {
        console.log('is ZodNumber');
        return Number(value);
    }
    if (schemaType === 'ZodBoolean') {
        console.log('is ZodBoolean');
        if (value === 'True') {
            return true;
        }
        else if (value === 'False') {
            return false;
        }
    }
    if (schemaType === 'ZodEnum') {
        console.log('value is an ZodEnum');
        const enumValues = unwrappedSchema.options;
        const match = enumValues.find((e) => typeof e === 'string' && e.toLowerCase() === value.toLowerCase());
        // console.log('got match', match);
        if (!match) {
            return value;
        }
        return match;
    }
    if (schemaType === 'ZodObject' || schemaType === 'ZodRecord') {
        console.log('value is an ZodObject');
        return JSON.parse(value);
    }
    if (schemaType === 'ZodArray') {
        console.log('value is a ZodArray');
        return JSON.parse(value);
    }
    console.log('value is string or unknown', unwrappedSchema._def.typeName);
    return value;
};
//# sourceMappingURL=parse-response.js.map