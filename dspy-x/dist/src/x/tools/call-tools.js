import z from "zod";
import { getToolingPrompt } from "./get-tooling-prompt.js";
import { parseResponse } from "../parse-response.js";
const toolResponseSchema = z.object({
    finished: z.boolean(),
    call: z.string().optional(),
    args: z.record(z.any()).optional()
});
export const callTools = async (model, signature, userInput, tools, toolContext = '') => {
    const prompt = getToolingPrompt(signature, userInput, tools, toolContext);
    console.log('[[tooling prompt]]', prompt);
    let response = await model.call(prompt);
    console.log('[[tooling response]]', response);
    const { finished, call, args } = parseResponse(response, toolResponseSchema);
    if (!finished) {
        console.log('|||| got args', args);
        const callTool = tools.find(tool => tool.name === call);
        let context;
        const parsedArgs = callTool?.inputSchema?.parse(args ?? {});
        context = callTool?.call(parsedArgs ?? {});
        const newToolContext = `
${toolContext}
Context from calling tool ${call}: ${context}
        `;
        console.log('new tool context', newToolContext);
        return callTools(model, signature, userInput, tools, newToolContext);
    }
    return toolContext;
};
//# sourceMappingURL=call-tools.js.map