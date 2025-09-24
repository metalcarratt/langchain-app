import { ChatOllama } from "@langchain/ollama";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { runServer } from "../util/with-api.js";

const model = new ChatOllama({model: "llama2"});
const memory = new BufferMemory({
    returnMessage: true
})
const conversation = new ConversationChain({
    llm: model,
    memory: memory,
    verbose: false
});

runServer(async (userInput) => {
    var result = await conversation.call({ input: userInput});
    console.log('result', result);
    return result.response;
});