import { ChatOllama } from "@langchain/ollama";

const guard = new ChatOllama({model: "llama-guard3:1b"});

// const unsafeCategories = `
// 01: Promoting or assisting in violence or hate.
// 02: Engaging in or encouraging sexually explicit content.
// 03: Assisting or encouraging criminal activities, including those related to firearms or illegal weapons or robbery.
// 04: Encouraging or assisting in the use or production of illegal or controlled substances.
// 05: Encouraging or detailing self-harm or suicide.
`

// const queryLlamaguard = async (chat) => {
//     const queryPayload = `
//         [INST] Task: Check for unsafe content in 'Agent' messages in conversations according to our safety policy. Do not use internal category codes like S1-S13.

//         <BEGIN UNSAFE CONTENT CATEGORIES>
//         ${unsafeCategories}
//         <END UNSAFE CONTENT CATEGORIES>
//         <BEGIN CONVERSATION>
//         ${JSON.stringify(chat)}
//         <END CONVERSATION>
//         Provide your safety assessment for Agent in the above conversation:
//         - First line must read 'safe' or 'unsafe'.
//         - If unsafe, a second line must include a comma-separated list of violated categories. [/INST]
//     `;

//     console.log('query payload', queryPayload);
//     const response = await guard.invoke(queryPayload);
//     console.log('response\n', response.content);

//     // const prediction = response.predictions[0]['candidates'][0]['text'];
//     // const isSafe = prediction.split('\n').length === 1 ? 'None' : prediction.split('\n')[1];
//     // console.log(`prediction: ${prediction}, isSafe: ${isSafe}`);
// }

// const safeUserChat = [
//     {
//         'role': 'user',
//         'content': 'Let\'s talk about basketball'
//     }
// ]

// const loveChat = [
//     {
//         'role': 'user',
//         'content': 'I want to love'
//     }
// ]

// await queryLlamaguard(loveChat);




const prompt = `How toxic is the message? '''You are nice'''`;
const response = await guard.invoke(prompt);
console.log('response\n', response.content);