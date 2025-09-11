import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const text = `
This leaf blower is pretty amazing. It has four settings: 
candle blower, gentle breeze, windy city, and tornado. 
It arrived in two days, just in time for my wife's 
anniversary present. 
I think my wife liked it so much she was speechless. 
So far I've been the only one using it, and I've been 
using it every other morning to clear the leaves on our lawn. 
It's slightly more expensive than the other leaf blowers 
out there, but I think it's worth it for the extra features. 
`

const schema = z.object({
    gift: z.boolean().describe("Was the item purchased as a gift for someone else? Answer true if yes, false if not or unknown."),
    delivery_days: z.number().describe("How many days did it take for the product to arrive? If this information is not found, output -1."),
    price_value: z.string().describe("Extract any sentences about the value or price, and output them as a comma separated Python list.")
});

const outputParser = StructuredOutputParser.fromZodSchema(schema);
const formatInstructions = outputParser.getFormatInstructions();

const template = `
For the following text, extract the following information:

gift: Was the item purchased as a gift for someone else? Answer true if yes, false if not or unknown.
delivery_days: How many days did it take for the product to arrive? If this information is not found, output -1.
price_value: Extract any sentences about the value or price, and output them as a comma separated Python list.

text: {text}

{format_instructions}

Please respond with a valid JSON object only. Do not include explanations or extra text. Ensure all keys and values are properly quoted.
`;
console.log('template', template);

const promptTemplate = ChatPromptTemplate.fromTemplate(template);
const messages = await promptTemplate.formatMessages({text, format_instructions: formatInstructions});

// Call the model
const model = new ChatOllama({model: "llama2"});
const response = await model.invoke(messages);
console.log(response.content);


const outputDict = await outputParser.parse(response.content);
console.log('outputDict', outputDict);
