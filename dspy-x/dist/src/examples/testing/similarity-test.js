import { fn } from "../../x/dspy-x.js";
import { llama3Model } from "../../models/llama3-model.js";
import { z } from 'zod';
const schema = {
    action: 'confirm whether the provided value has a **similar** meaning to the expected value',
    inputs: z.object({
        provided: z.string(),
        expected: z.string()
    }),
    outputs: z.object({
        result: z.boolean(),
        rationale: z.string()
    })
};
const examples = [{
        given: {
            provided: 'Goodbye',
            expected: 'See you later'
        },
        expect: {
            result: true,
            rationale: 'They are both ways to say farewell to someone'
        }
    }, {
        given: {
            provided: 'Good morning',
            expected: 'Hi'
        },
        expect: {
            result: true,
            rationale: 'They are both ways to say greet someone'
        }
    }];
export const similarityTestFn = fn(llama3Model, schema, examples);
//# sourceMappingURL=similarity-test.js.map