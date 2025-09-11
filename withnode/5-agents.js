import { ChatOllama } from "@langchain/ollama";
import { Calculator } from "@langchain/community/tools/calculator";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { PromptTemplate } from "@langchain/core/prompts";
import { AgentExecutor, createReactAgent } from "langchain/agents";

const llm = new ChatOllama({model: "openhermes", temperature: 0});

const tools = [
  new Calculator(),
//   new WikipediaQueryRun()
];

const prompt = PromptTemplate.fromTemplate(`
You are a helpful AI agent. Use the following tools to answer the question.

Available tools:
{tool_names}

When answering, always follow this format:

Thought: [your reasoning]
Action: [tool name]
Action Input: [input for the tool]

OR

Thought: [your reasoning]
Final Answer: [your answer]

Question: {input}

{agent_scratchpad}
`);

prompt.inputVariables = ["input", "tools", "tool_names", "agent_scratchpad"]; 

const agent = await createReactAgent({ llm, tools, prompt });
const executor = AgentExecutor.fromAgentAndTools({ agent, tools });

const result = await executor.invoke({ input: "What is 25% of 300?"});
console.log(result);

// const executor = await initializeAgentExecutorWithOptions(tools, llm, {
//   agentType: "chat-zero-shot-react-description",
//   verbose: true,
//   handleParsingErrors: true,
// });


// Math (which it gets wrong)
// print(agent("Calculate 13 ** 0.3432?"))

// response = llm.invoke("What is 13 raised to the 0.3432 power?")
// print(response.content);