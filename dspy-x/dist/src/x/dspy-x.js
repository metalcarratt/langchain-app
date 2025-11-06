import { parseResponse } from "./parse-response.js";
import { createPrompt } from "./create-prompt.js";
import { callTools } from "./tools/call-tools.js";
import { getDebugCollector } from "./debug/debug-collector.js";
export const fn = (model, sig, examples) => {
    const call = async (input, debug) => {
        const debugCollector = getDebugCollector();
        try {
            let toolContext;
            if (sig.tools?.length) {
                toolContext = await callTools(model, sig, input, sig.tools);
                console.log('Got tool context', toolContext);
            }
            const prompt = createPrompt(sig, input, examples, toolContext, debug);
            if (debug) {
                debugCollector.collect('Main prompt', prompt);
            }
            let response = await model.call(prompt);
            if (debug) {
                console.log('response', response);
                debugCollector.collect('Main LLM response', response);
            }
            let data = parseResponse(`${response}`, sig.outputs);
            // if (Object.keys(data).length !== sig.outputs.length) {
            //     // retry
            //     response = await model.call(prompt);
            //     data = parseResponse(`${response}`, sig);
            // }
            if (debug) {
                debugCollector.printReport();
            }
            return {
                prompt,
                raw: response,
                data
            };
        }
        catch (error) {
            if (debug) {
                debugCollector.printReport();
            }
            throw error;
        }
    };
    return call;
};
//# sourceMappingURL=dspy-x.js.map