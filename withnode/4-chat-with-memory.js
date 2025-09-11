import { ChatOllama } from "@langchain/ollama";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

const model = new ChatOllama({model: "llama2"});
const memory = new BufferMemory({
    returnMessage: true
})
const conversation = new ConversationChain({
    llm: model,
    memory: memory,
    verbose: false
});


var result = await conversation.call({ input: "Hi, my name is Caleb. Remember that my name is Caleb."});
console.log(result);

result = await conversation.call({ input: "What is 1+1?"});
console.log(result);

result = await conversation.call({ input: "What is my name?"});
console.log(result);
