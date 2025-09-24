import { ChatOllama } from "@langchain/ollama";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { runServer } from "../util/with-api.js";

const buildBot = ({myName, othersName, myDesc, othersDesc, talkWhere}) => {
    const systemInstruction = `
    Your name is ${myName} and you are an ${myDesc} who is talking to ${othersDesc} ${talkWhere}. The Human's name is ${othersName}.
    Do not repeat yourself.
    Make it interesting. Don't let the story go on and on with pointless conversation, the story needs to advance.
    Don't speak too long, no more than a sentence. This is a conversation, not a monologue.
    Respond only as ${myName}. Do not write ${othersName}'s lines. Keep your response to one sentence.
    Don't return your name, the other person's name on anyone else's name, or any quotation marks. Just give your response.
    Don't speak in the third person. Only answer as your character would answer, and don't give any description about things
    you are doing that we wouldn't know about unless you had said it.
    `
    const prompt = ChatPromptTemplate.fromMessages([
        ['system', systemInstruction],
        ["human", "{input}"]
    ]);
    
    const model = new ChatOllama({model: "llama2"});
    const memory = new BufferMemory({
        returnMessage: true,
        inputKey: "input"
    });
    const bot = new ConversationChain({
        llm: model,
        memory,
        verbose: false,
        prompt
    });

    return {
        say: async (sayWhat) => bot.call({ input: sayWhat}),
        name: myName
    };
}

const talkToBot = async ({bot, say, messages}) => {
    const reply = await bot.say(say);
    const response = reply.response;
    messages.push({
        name: bot.name,
        say: response
    });
    return response;
}

const doChat = async ({bot1, bot2, bot1say, messages}) => {
    const bot2say = await talkToBot({bot: bot2, say: bot1say, messages});
    const bot1say2 = await talkToBot({bot: bot1, say: bot2say, messages});
    return bot1say2;
}

const doWholeChat = async ({bot1, bot2, initialPrompt, iterations}) => {
    const messages = [{
        name: bot1.name,
        say: initialPrompt
    }];

    let bot1say = await doChat({bot1, bot2, bot1say: initialPrompt, messages});
    for (var i = 0; i < iterations; i++) {
        bot1say = await doChat({bot1, bot2, bot1say, messages});
    }

    return messages;
}

// const location='at a coffee shop';
// const name1='Jane';
// const desc1='an angry customer';
// const name2='Tilly';
// const desc2='a waitress';
// const startWith='Ouch! You spilled that coffee on me!';

// const bot1 = buildBot({myName: name1, othersName: name2, myDesc: desc1, othersDesc: desc2, location});
// const bot2 = buildBot({myName: name2, othersName: name1, myDesc: desc2, othersDesc: desc1, location});
// const messages = await doWholeChat({bot1, bot2, initialPrompt: startWith, iterations: 3});

// for (var message of messages) {
//     console.log(`${message.name}: ${message.say}`);
// }


runServer(async ({location, name1, desc1, name2, desc2, startWith, rounds}) => {
    console.log('location', location);
    console.log('name1', name1);
    console.log('desc1', desc1);
    console.log('name2', name2);
    console.log('desc2', desc2);
    console.log('startWith', startWith);

    const bot1 = buildBot({myName: name1, othersName: name2, myDesc: desc1, othersDesc: desc2, location});
    const bot2 = buildBot({myName: name2, othersName: name1, myDesc: desc2, othersDesc: desc1, location});
    const messages = await doWholeChat({bot1, bot2, initialPrompt: startWith, iterations: rounds});

    // var result = await conversation.call({ input: userInput});
    console.log('messages', messages);
    return messages;
});