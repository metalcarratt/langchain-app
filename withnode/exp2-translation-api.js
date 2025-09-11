import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { runServer } from "./with-api.js";

const model = new ChatOllama({model: "llama2"});

const schema = z.object({
    translation: z.string().describe("The translated text")
});

const outputParser = StructuredOutputParser.fromZodSchema(schema);
const formatInstructions = outputParser.getFormatInstructions();

const ENGLISH_LANGUAGE = `English`;

const systemInstruction = `
You must respond with a valid JSON object that matches the following schema:

{format_instructions}

Do not include any explanation, commentary, or extra text. Only output the JSON object. No markdown, no preamble, no postscript.
`;

const humanInstruction = `
Please translate the text into {language}:

[{text}]
`;

const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemInstruction],
    ['human', humanInstruction]
]);

runServer(async (userInput) => {
    const messages = await promptTemplate.formatMessages({
        language: userInput.language ?? ENGLISH_LANGUAGE, 
        text: userInput.text, 
        format_instructions: formatInstructions
    });
    console.log('messages', messages);
    const response = await model.invoke(messages);
    console.log('response.content', response.content);

    const raw = response.content;
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}") + 1;
    const jsonText = raw.slice(jsonStart, jsonEnd);

    const output = await outputParser.parse(jsonText);
    console.log('output', output);
    console.log('output.translation', output.translation);
    
    return output.translation;
});