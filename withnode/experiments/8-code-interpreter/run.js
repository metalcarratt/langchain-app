import { ChatOllama } from "@langchain/ollama";
import { readFileTool } from './read-file-tool.js';
import { StateGraph, START, END } from "@langchain/langgraph";
import { createLlmNode } from "./my-graph/llm-node.js";
import { conditionalRoute } from './my-graph/tool-router.js';
import { createToolExecutor } from './my-graph/tool-executor-node.js';

const model = new ChatOllama({model: "llama3:8b", temperature: 0});

const llmNode = createLlmNode(model);
// const toolRouter = createToolRouter();
const toolExecutor = createToolExecutor({readFileTool});

const graph = new StateGraph({
  channels: {
    input: 'input',
    llm_output: 'llm_output',
    tool_call: 'tool_call',
    tool_output: 'tool_output',
    final_output: 'final_output'
  }
});

graph.addNode('llm', llmNode);
// graph.addNode('router', toolRouter);
graph.addNode('tool', toolExecutor);
// graph.addNode('llmExplain', llmExplain);

graph.addEdge(START, 'llm');
// graph.addEdge('llm', 'router');
graph.addConditionalEdges({
  source: 'llm',
  ...conditionalRoute
});
graph.addEdge('tool', 'llm');

const app = graph.compile();



const result = await app.invoke({ input: `Please explain the code in the file ./example-code/binary-tree.js`});
console.log('\n\n\n|| Final result:\n', result.final_output);