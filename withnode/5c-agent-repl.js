import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { Tool } from "@langchain/core/tools";
import { AgentExecutor, createReactAgent } from "langchain/agents";

const llm = new ChatOllama({model: "openhermes", temperature: 0});


class JsReplTool extends Tool {
    name = "js-repl-tool";
    description = "Executes JavaScript code and returns the result";

    async _call(input) {        
      try {
        const result = eval(input);
        return String(result);
      } catch (err) {
        return `Error: ${err.message}`;
      } 
    }
}

const tools = [
  new JsReplTool(),
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

⚠️ Do not include both an Action and a Final Answer in the same response.
⚠️ Do not wrap code in markdown blocks (no triple backticks).
Only provide a Final Answer after receiving an Observation from a tool. If you use a tool, wait for the Observation before responding with a Final Answer.

Question: {input}

{agent_scratchpad}
`);

prompt.inputVariables = ["input", "tools", "tool_names", "agent_scratchpad"]; 

const agent = await createReactAgent({ llm, tools, prompt });
const executor = AgentExecutor.fromAgentAndTools({ agent, tools, handleParsingErrors: true, verbose: true });

const customerList = [
  ["Harrison", "Chase"], 
  ["Lang", "Chain"],
  ["Dolly", "Too"],
  ["Elle", "Elem"], 
  ["Geoff","Fusion"], 
  ["Trance","Former"],
  ["Jen","Ayai"]
];
const agentPrompt = `Sort the following array of customer names using JavaScript: ${customerList}`;

const result = await executor.invoke({ input: agentPrompt});
console.log(result);



