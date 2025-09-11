import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const text = `안녕하세요, 제 숙제 좀 도와주시겠어요? 숙제가 꽤 많은데, 정말 이해가 안 되는 게 몇 가지 있어요.`;
const style = `English`;
const template = `Please translate the text [${text}] into ${style} so I can communicate with someone who can help me.`;

const promptTemplate = ChatPromptTemplate.fromTemplate(template);
console.log('prompt template', promptTemplate.promptMessages[0].prompt);

const messages = await promptTemplate.formatMessages(style, text);
console.log('messages', messages);


// Call the model
const model = new ChatOllama({model: "llama2"});
const response = await model.invoke(messages);
console.log(response.content);
