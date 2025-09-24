import { ChatOllama } from "@langchain/ollama";
import { RunnableLambda } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOllama({
    model: "openhermes",
    temperature: 0.8
});

const apiDetails = `
- the "GET /user-details" API which gets general information about the user, such as their personalised
name, etc.

- the "GET /accounts" API which get a list of all accounts the user has and details about them such as account number, type, balance, etc.
account types include: an everyday account, for day to day spending; a savings account, with higher interest rates; a credit card account;
and foreign currency account.

- the "GET /transactions" API which gets a list of all transactions made for a particular account, including when the transaction
happened, which person or organisation the money was transferred to/from, and how much was transferred. Transactions can be queried for
a given timeframe to prevent retrieving all transactions across multiple years.

- the "GET /payees" API, for a list of all payees saved for the user.

- the "GET /lookups/organisations" API, for a lookup of a person or organisation given a particular account id. An organisation might be, for example, a shop or service provider

- the "GET /lookups/account-types" API, a lookup that contains information about an account type, such as interest rates, account fees, etc.
`;

const makePrompt = (question) => `
You have access to a number of APIs to call and get information
about a user's bank account details:

${apiDetails}

Using the above information, outline a list of APIs you would call and the information you would retrieve to answer the user's question enclosed in 
square brackets below.

DO NOT suggest anything that would involve the user moving to another bank.

Calling APIs can incur a cost (either time or money), so don't call APIs you don't need to in order to directly answer the user's question.

Question: [${question}]
`;

const ask = async (question) => {
    const prompt = makePrompt(question);
    const response = await model.invoke(prompt);
    console.log(`Question: ${question}`)
    console.log(`Answer: ${response.content}`);
}

// await ask("How many accounts do I have?"); // GOOD
// await ask("What is the combined balance of all my accounts?"); // GOOD
// await ask("How much money did I spend at the supermarket in the last month?"); // GOOD
// await ask("What is my current account balance for my everyday account?"); // GOOD
// await ask("How can I increase the interest rate on my savings account?"); // OKAY, but need more APIs
// await ask("Which transactions did I make last month on my credit card account?"); // GOOD
await ask("Are there any foreign currency accounts linked to my profile?"); // GOOD
// await ask("Can I transfer money from my savings account to my everyday account instantly?");
// await ask("Who is the top payee I have been transferring money to in the past six months?");
// await ask("How can I view and manage my payees more efficiently?");
// await ask("What are the fees associated with using my foreign currency account?");
// await ask("Are there any promotions or bonuses available for using specific accounts?");
// await ask("Can I set up automatic transfers between my accounts to better manage my finances?");


const generateQuestions = async () => {
    const response = await model.invoke(`
        You have access to the following APIs related to user banking:

        ${apiDetails}

        Generate 10 thoughtful questions a user might ask about their accounts, transactions, or payees.
        Be diverse and realistic. Return the questions as a numbered list.
    `);
    
    console.log(response.content);
};
// generateQuestions();