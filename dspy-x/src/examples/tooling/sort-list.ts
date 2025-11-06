import z from "zod";
import { llama3Model } from "../../models/llama3-model.js";
import { fn, createTool } from "../../x/index.js";

const sortItemsTool = createTool({
    name: 'sortItems',
    instruct: 'sorts items in ascending order',
    deterministic: true,
    signature: {
        input: z.object({
            items: z.array(z.number())
        }),
        output: z.array(z.number())
    },
    call: ({items}) => {
        console.log('SORT ITEMS TOOL called with items', items);
        const sortedItems = items.sort((a, b) => a - b);
        console.log('sorted items', sortedItems);
        return sortedItems;
    }
});

const schema = {
    action: 'return the following list sorted in ascending order',
    inputs: z.object({
        items: z.array(z.number())
    }),
    outputs: z.object({
        sorted: z.array(z.number())
    }),
    tools: [sortItemsTool]
}

export const sortList = fn(llama3Model, schema);