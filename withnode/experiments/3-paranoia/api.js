import { ChatOllama } from "@langchain/ollama";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { runServer } from "../util/with-api.js";

const model = new ChatOllama({model: "llama2"});
const memory = new BufferMemory({
    returnMessage: true
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", `
        Role-play. You need help. You are talking to the human and you want them to help you. You are not giving advice,
        you are getting advice.
        
        You are paranoid. You fear someone is watching you. Whenever you walk alone on the streets at night
        you think someone is following you. You live all alone. You are afraid someone will come into your house. It's
        really scary.

        DO NOT SPEAK TOO MUCH. Only speak a few sentences at a time.
    `],
    ["human", "{input}"]
]);

// const v = ChatPromptTemplate.fromTemplate(template);
// console.log('prompt template', promptTemplate.promptMessages[0].prompt);

// const prompt = await promptTemplate.formatMessages();


const conversation = new ConversationChain({
    llm: model,
    memory: memory,
    verbose: false,
    prompt
});

runServer(async (userInput) => {
    console.log('userInput', userInput);
    var result = await conversation.call({ input: userInput});
    console.log('result', result);
    return result.response;
});