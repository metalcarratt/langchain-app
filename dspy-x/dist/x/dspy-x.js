import { parseResponse } from "./parse-response.js";
import { createPrompt } from "./create-prompt.js";
import { callTools } from "./tools/call-tools.js";
import { getDebugCollector } from "./debug/debug-collector.js";
import util from 'node:util';
export const fn = (model, sig, examples) => {
    const call = async (input, debug) => {
        const debugCollector = getDebugCollector();
        try {
            let toolContext;
            if (sig.tools?.length) {
                const toolDebugCollector = debugCollector.createSubSection('Call tools');
                toolContext = await callTools(model, sig, input, sig.tools, toolDebugCollector);
                console.log('Got tool context', toolContext);
                toolDebugCollector.collect('Final tool context:', toolContext);
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
                debugCollector.collect('Resulting data', JSON.stringify(data, null, 2), false);
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
                debugCollector.error('Error', util.inspect(error, { depth: null, colors: false }), false);
                debugCollector.printReport();
            }
            throw error;
        }
    };
    return call;
};
//# sourceMappingURL=dspy-x.js.map