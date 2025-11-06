import { fn } from "../x/dspy-x.js";
import { llama3Model } from "../models/llama3-model.js";
import z from "zod";
const schema = {
    action: 'translate the text into the given language',
    inputs: z.object({
        text: z.string(),
        language: z.string()
    }),
    outputs: z.object({
        translation: z.string()
    })
};
const examples = [{
        given: {
            text: 'Let\'s get something to eat',
            language: 'Korean'
        },
        expect: {
            translation: '뭐 좀 먹자'
        }
    }];
export const translateFn = fn(llama3Model, schema, examples);
//# sourceMappingURL=translate-language.js.map