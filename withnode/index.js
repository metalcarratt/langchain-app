import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({model: "llama2"});

const response = await model.invoke("what's your name?");

console.log(response.content);