import { fn } from "../../x/dspy-x.js";
import { llama3Model } from "../../models/llama3-model.js";
import z from "zod";
export const schema = {
    action: 'confirm whether the summary matches the text or not',
    inputs: z.object({
        summary: z.string(),
        text: z.string()
    }),
    outputs: z.object({
        result: z.boolean(),
        rationale: z.string()
    }),
};
const examples = [{
        given: {
            summary: 'offensive language',
            text: 'You are so stupid'
        },
        expect: {
            result: false,
            rationale: 'stupid is an offensive word'
        }
    }];
export const validateSummary = fn(llama3Model, schema, examples);
//# sourceMappingURL=validate-summary.js.map