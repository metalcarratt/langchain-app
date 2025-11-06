import { createPrompt } from "./create-prompt.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
export const queryModel = async (model, signature, input) => {
    const prompt = createPrompt(signature);
    // console.log('prompt', prompt);
    const promptTemplate = ChatPromptTemplate.fromMessages([
        // ['system', systemInstruction],
        ['human', prompt]
    ]);
    const message = await promptTemplate.formatMessages({ input });
    const response = await model.invoke(message);
    // console.log('response', response.content);
    return parseResponse(`${response.content}`, signature);
};
const parseResponse = (response, signature) => {
    const outputs = signature.outputs.map(o => o.name);
    const lines = response.split('\n');
    const result = {};
    for (const key of outputs) {
        const upperKey = key[0]?.toUpperCase() + key.slice(1);
        // console.log('upperKey', upperKey);
        const match = lines.find(line => line.startsWith(`${upperKey}:`));
        if (match)
            result[key] = match.slice(key.length + 1).trim();
    }
    return result;
};
//# sourceMappingURL=query-model.js.map