import { ChatOllama } from "@langchain/ollama";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { runServer } from "../util/with-api.js";

const model = new ChatOllama({model: "llama3:8b"});
let memory;
let conversation;
let conversationLength = 0;

const generateStartingQuestion = async () => {
    const question = `
            You are a friendly recruiter starting a conversation with a candidate. 
            Your goal is to gently begin learning about their personality and work style. 

            Respond with a single, light-hearted opening question that feels natural and 
            conversational. Avoid heavy or formal questions. Do not explain your 
            reasoning—just output the question. Don't ask a question about super powers.
        `;
    var result = await model.invoke(question);

    return result.content;
}

const initConversation = (initialQuestion) => {
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", `
            You are a friendly recruiter having a conversation with a candidate. 
            Your goal is to gently learn about their personality and work style.

            Respond with single, light-hearted questions that feels natural and 
            conversational. Avoid heavy or formal questions.

            Don't stay on one topic too long. Try changing the question after talking about one
            topic for a little bit.

            AI: ${initialQuestion}
        `],
        ["human", "{input}"]
    ]);
    memory = new BufferMemory({
        returnMessage: true
    });
    conversation = new ConversationChain({
        llm: model,
        memory: memory,
        prompt,
        verbose: false
    });
    conversationLength = 0;
}

const continueConversation = async (userInput) => {
    var result = await conversation.call({ input: userInput});
    console.log('result', result);
    return result.response;
}

const endConversation = async (userInput) => {
    try {
    await memory.saveContext({input: userInput}, {output: ""});
    const { history } = await memory.loadMemoryVariables({});
console.log('history', history);

    const summaryPrompt = ChatPromptTemplate.fromMessages([
        ["system", `
            You are a recruiter summarizing a candidate's personality and work style based on a recent conversation.

            Your summary should include:
            - Key personality traits and strengths inferred from their responses
            - Quotes or paraphrased insights that support those traits
            - Optional suggestions for job roles or team environments where this candidate might thrive

            Also include a trait score from 1–5 for each of the following:
            - Openness
            - Conscientiousness
            - Extraversion
            - Agreeableness
            - Emotional Stability

            Be thoughtful, concise, and professional. Avoid generic statements. Base your summary only on the conversation below.
        `],
        ["human", "Conversation:\n{history}\n\nPlease generate the summary."]
    ]);

    const summaryChain = summaryPrompt.pipe(model);
    const summary = await summaryChain.invoke({ history });
    console.log('summary', summary.content);
    return summary.content;
} catch (err) {
    console.log('err', err);
    return "something went wrong";
}
}

runServer(
    // continue/end conversation
    async (userInput) => {
        conversationLength++;
        console.log('conversationLength', conversationLength);
        if (conversationLength < 5) {
            return continueConversation(userInput);
        } else {
            return endConversation(userInput);
        }
    },
    // start conversation
    async () => {
        var initialQuestion = await generateStartingQuestion();
        console.log('initialQuestion', initialQuestion);

        initConversation(initialQuestion);
        return initialQuestion;
    }
);