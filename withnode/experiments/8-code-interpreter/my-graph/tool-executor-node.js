import { TOOL_CALL } from './tool-router.js';

// tools = Record<string, tool>

export const TOOL_OUTPUT = 'tool_output';

export const createToolExecutor = (tools) => async (state) => {
  console.log('TOOL EXECUTOR called');
  // console.log('Tool executor received:', state);
  const tool_call = state[TOOL_CALL];
  const toolName = tool_call?.toolName;
  const tool = tools[toolName];
  if (tool) {
    const result = await tool.invoke(tool_call.args);
    return { ...state, [TOOL_OUTPUT]: result };
  }
  return { ...state, final_output: `Unknown tool: ${tool_call.toolName}`};
};