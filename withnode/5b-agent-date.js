import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { Tool } from "@langchain/core/tools";
import { AgentExecutor, createReactAgent } from "langchain/agents";

const llm = new ChatOllama({model: "openhermes", temperature: 0});


class DateTool extends Tool {
    name = "date-tool";
    description = "Returns the current date";

    async _call(_) {        
        const today = new Date();
        const dateOnly = today.toISOString().split('T')[0];
        return dateOnly;
    }
}

const tools = [
  new DateTool(),
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
Only provide a Final Answer after receiving an Observation from a tool. If you use a tool, wait for the Observation before responding with a Final Answer.

Question: {input}

{agent_scratchpad}
`);

prompt.inputVariables = ["input", "tools", "tool_names", "agent_scratchpad"]; 

const agent = await createReactAgent({ llm, tools, prompt });
const executor = AgentExecutor.fromAgentAndTools({ agent, tools, handleParsingErrors: true, verbose: true });

const result = await executor.invoke({ input: "What is today's date?"});
console.log(result);



