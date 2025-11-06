import { ChatOllama } from "@langchain/ollama";
const model = new ChatOllama({ model: "llama3:8b", temperature: 0 });
export const llama3Model = {
    call: async (prompt) => {
        const response = await model.invoke(prompt);
        return `${response.content}`;
    }
};
//# sourceMappingURL=llama3-model.js.map