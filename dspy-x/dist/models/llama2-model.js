import { ChatOllama } from "@langchain/ollama";
import {} from "../x/dspy-x.js";
const model = new ChatOllama({ model: "llama3:8b", temperature: 0 });
export const llama2Model = {
    call: async (prompt) => {
        const response = await model.invoke(prompt);
        return `${response.content}`;
    }
};
//# sourceMappingURL=llama2-model.js.map