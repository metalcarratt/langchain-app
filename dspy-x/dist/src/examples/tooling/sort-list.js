import z from "zod";
import { llama3Model } from "../../models/llama3-model.js";
import { fn } from "../../x/index.js";
const toolSchema = z.object({
    items: z.array(z.number())
});
const sortItemsTool = {
    name: 'sortItems',
    description: 'sorts items in descending order',
    inputSchema: toolSchema,
    call: ({ items }) => items.sort((a, b) => b - a).join(', ')
};
const schema = {
    action: 'return the following list sorted in descending order',
    inputs: z.object({
        items: z.array(z.number())
    }),
    outputs: z.object({
        sorted: z.string()
    }),
    tools: [sortItemsTool]
};
export const sortList = fn(llama3Model, schema);
//# sourceMappingURL=sort-list.js.map