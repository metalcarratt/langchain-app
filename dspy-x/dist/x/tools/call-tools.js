import z from "zod";
import { getToolingPrompt } from "./get-tooling-prompt.js";
import { parseResponse } from "../parse-response.js";
const MAX_LAYERS = 1;
const toolResponseSchema = z.object({
    finished: z.boolean(),
    call: z.string().optional(),
    args: z.record(z.any()).optional()
});
export const callTools = async (model, signature, userInput, tools, debugCollector, toolContext = '', layers = 0) => {
    const prompt = getToolingPrompt(signature, userInput, tools, toolContext);
    const layerCollector = debugCollector.createSubSection('Tooling layer ' + (layers + 1));
    layerCollector.collect('Tooling prompt', prompt);
    // 1. Call Model and ask what tool to call
    let response = await model.call(prompt);
    layerCollector.collect('Tooling response', response);
    const { finished, call, args } = parseResponse(response, toolResponseSchema);
    if (!finished) {
        // 2. Call tool
        layerCollector.collect('Tooling Args', JSON.stringify(args));
        const callTool = tools.find(tool => tool.name === call);
        let context;
        const parsedArgs = callTool?.signature?.input?.parse(args ?? {});
        context = callTool?.call(parsedArgs ?? {});
        // 3. Parse result
        // console.log('Result of calling tool', context);
        layerCollector.collect('Result of calling tool', JSON.stringify(context) ?? 'undefined');
        const newToolContext = `
${toolContext}
--- Tool: ${callTool?.name} ---
Input: ${JSON.stringify(parsedArgs)}
Output: ${JSON.stringify(context)}

        `;
        // console.log('New tool context', newToolContext);
        layerCollector.collect('New tool context', newToolContext);
        if (layers > MAX_LAYERS) {
            return newToolContext;
        }
        else {
            return callTools(model, signature, userInput, tools, debugCollector, newToolContext, layers + 1);
        }
    }
    return toolContext;
};
//# sourceMappingURL=call-tools.js.map