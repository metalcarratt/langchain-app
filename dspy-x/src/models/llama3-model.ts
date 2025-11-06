import { ChatOllama } from "@langchain/ollama";
import type { Model } from "../x/types.js";

const model = new ChatOllama({model: "llama3:8b", temperature: 0});

export const llama3Model: Model = {
    call: async (prompt: string) => {
        const response = await model.invoke(prompt);
        return `${response.content}`;
    }
}