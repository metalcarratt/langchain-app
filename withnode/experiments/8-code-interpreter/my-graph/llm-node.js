import { routeToTool } from './tool-router.js';
import { TOOL_OUTPUT } from './tool-executor-node.js';

export const createLlmNode = (model) => async (state) => {
  console.log('LLM NODE called');
  const tool_output = state[TOOL_OUTPUT]
  const { input } = state;

  const prompt = tool_output
    ? `Here is the code content:\n\n${tool_output}\n\nPlease explain it.`
    : input;

  const response = await model.invoke([
    { role: 'system', content: `
      You are a helpful coding assistant. Use the tool output to explain the code. Do not guess or rewrite it.

      If the user asks about a file, you MUST respond with:
      TOOL: readFileTool(filePath: "<path>")

      If no tool is needed, respond with:
      FINAL: <your final answer>

      Do not mix TOOL and FINAL. Respond with one or the other.
    `},
    { role: 'user', content: prompt }
  ]);
  // console.log("LLM output:", response.content);
  const routeResults = await routeToTool(response.content);
  return { ...state, ...routeResults };
};