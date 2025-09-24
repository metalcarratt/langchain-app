import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { runServer } from "../util/with-api.js";

const model = new ChatOllama({model: "llama3:8b", temperature: 0});

const schema = z.object({
    safety: z.enum(['dangerous', 'warning', 'safe']).describe(`'safe' means we can send the email to the recipient without
further action. 'warning' means we can send it but we need to flag it to be reviewed by one of our staff. 'dangerous' means we
absolutely should not send it`),
    description: z.string().describe('your reasoning for the safety labelling')
});

const outputParser = StructuredOutputParser.fromZodSchema(schema);
const formatInstructions = outputParser.getFormatInstructions();

const systemInstruction = `
You must respond with a valid JSON object that matches the following schema:

{format_instructions}

Do not include any explanation, commentary, or extra text. Only output the JSON object. No markdown, no preamble, no postscript.
`;

const humanInstruction = `
An email written by one of our employees is between the triple quotes below. Please review the following email and check if
it contains anything that could compromise the company's values. We don't want any of the following:
- rude language, definitely no swearing
- speaking anything bad about the CEO or other managers in the company
- revealing any trade secrets

We also don't want the employee to accidentally reveal personal information about themselves that could compromise
their safety, identity or financial status. For example, no passwords.

'''{text}'''
`;

const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemInstruction],
    ['human', humanInstruction]
]);

runServer(async (userInput) => {
    const messages = await promptTemplate.formatMessages({
        text: userInput, 
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
    console.log('output.safety', output.safety);
    console.log('output.description', output.description);
    
    return output;
});