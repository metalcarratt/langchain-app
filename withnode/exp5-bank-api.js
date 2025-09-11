import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { runServer } from "./with-api.js";

const model = new ChatOllama({
    model: "llama2",
    temperature: 0.0
});

const accounts = `
Below is a list of account. Each account has a type, a balance and a list of transactions. The balance is how much
money is in the account. The transactions are the history of the account before the current balance. Each transaction
has a date (when it happened), an outgoing (if money went out) or an incoming (if money came in), what it was for and
who it was to or from.

accounts:
- accountNumber: 1,
  type: 'Everyday Account',
  balance: 500,
  transactions:
  - date: '2025-09-09 2:45pm',
    outgoing: 12,
    to: 'Starbucks'
  - date: '2025-09-09 9:44am',
    outgoing: 500,
    for: 'Rent',
    to: 'Landlord'
  - date: '2025-09-08 5:00pm',
    incoming: 800,
    for: 'Salary',
    from: 'My Company'
- accountNumber: 2,
  type: 'Credit Card Account',
  balance: -1000,
  transactions:
  - date: '2025-09-08 6:23pm',
    outgoing: 25,
    for: 'Dinner',
    to: 'Relax Diner'
`

const systemInstruction = `
Respond with a snippet of HTML. Do not include an html or body tag, just the elements needed to display your output.

Depending on the content you may want to return a paragraph, an ordered or unordered list, or a table.

Do not include any explanation, commentary, or extra text. Only output the HTML. No markdown, no preamble, no postscript.
`;

const humanInstruction = `
Here are my account details:

${JSON.stringify(accounts)}

Answer my question using the data in my account details:

{text}
`;

console.log('humanInstruction', humanInstruction);

const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemInstruction],
    ['human', humanInstruction]
]);


// const query = "List all my accounts with their id, type and balance.";
// const query = "How much money do I have in total?";

runServer(async (userInput) => {
    const messages = await promptTemplate.formatMessages({
        text: userInput, 
    });
    console.log('messages', messages);
    const response = await model.invoke(messages);
    console.log('response.content', response.content);
    
    const raw = response.content;
    const htmlStart = raw.indexOf("<");
    const htmlEnd = raw.lastIndexOf(">") + 1;
    const htmlText = raw.slice(htmlStart, htmlEnd);

    return htmlText;
});