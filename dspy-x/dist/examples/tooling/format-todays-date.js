import z from "zod";
import { fn } from "../../x/dspy-x.js";
import { llama3Model } from "../../models/llama3-model.js";
import { createTool } from "../../x/index.js";
const dateTool = createTool({
    name: 'getDate',
    instruct: 'returns today\'s date',
    deterministic: true,
    call: () => `${new Date()}`
});
const schema = {
    action: 'return today\'s date using the provided format',
    inputs: z.object({
        format: z.string()
    }),
    outputs: z.object({
        date: z.string()
    }),
    tools: [dateTool]
};
export const formatTodaysDate = fn(llama3Model, schema);
//# sourceMappingURL=format-todays-date.js.map