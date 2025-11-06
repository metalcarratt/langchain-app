import { parseResponse } from "./parse-response.js";
import { createPrompt } from "./create-prompt.js";
export const fn = (model, sig) => {
    const call = async (input, debug) => {
        const prompt = createPrompt(sig, input, debug);
        let response = await model.call(prompt);
        let data = parseResponse(`${response}`, sig);
        if (Object.keys(data).length !== sig.outputs.length) {
            // retry
            response = await model.call(prompt);
            data = parseResponse(`${response}`, sig);
        }
        return {
            prompt,
            raw: response,
            data
        };
    };
    return call;
};
//# sourceMappingURL=dspy-x.js.map