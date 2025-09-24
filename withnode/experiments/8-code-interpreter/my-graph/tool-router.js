import { END } from "@langchain/langgraph";

// export const createToolRouter = () => async (state) => {
//   console.log('TOOL ROUTER called');
//   const { llm_output } = state;
//   const match = llm_output.match(/TOOL:\s*(\w+)\(([^)]+)\)/);
//   if (match) {
//     console.log('[TOOL ROUTER] invoke tool');
//     const [, toolName, argString] = match;
//     const args = {};

//     // Handle both key:value and single string formats
//     if (argString.includes(":")) {
//       Object.assign(args, Object.fromEntries(
//         argString.split(",").map((pair) => {
//           const [key, value] = pair.split(":").map((s) => s.trim().replace(/^["']|["']$/g, ""));
//           return [key, value];
//         })
//       ));
//     } else {
//       args.filePath = argString.trim().replace(/^["']|["']$/g, "");
//     }
//     return { ...state, tool_call: { toolName, args }};
//   }
//   console.log('[TOOL ROUTER] return final_output');
//   return { ...state, final_output: llm_output };
// }

export const TOOL_CALL = "tool_call";
export const FINAL_OUTPUT = "final_output";

export const routeToTool = async (llmResponse) => {
  console.log('TOOL ROUTER called');
//   const { llm_output } = state;
  const match = llmResponse.match(/TOOL:\s*(\w+)\(([^)]+)\)/);
  if (match) {
    console.log('[TOOL ROUTER] invoke tool');
    const [, toolName, argString] = match;
    const args = {};

    // Handle both key:value and single string formats
    if (argString.includes(":")) {
      Object.assign(args, Object.fromEntries(
        argString.split(",").map((pair) => {
          const [key, value] = pair.split(":").map((s) => s.trim().replace(/^["']|["']$/g, ""));
          return [key, value];
        })
      ));
    } else {
      args.filePath = argString.trim().replace(/^["']|["']$/g, "");
    }
    return { [TOOL_CALL]: { toolName, args }};
  }
  console.log('[TOOL ROUTER] return final_output');
  return { [FINAL_OUTPUT]: llmResponse };
}

export const conditionalRoute = {
  path: async (state) => {
    console.log('ROUTER BRANCH called', state);
    if (state[FINAL_OUTPUT]) return FINAL_OUTPUT;
    if (state[TOOL_CALL]) return TOOL_CALL;
    return "default";
  },
  pathMap: {
    [TOOL_CALL]: 'tool',
    [FINAL_OUTPUT]: END
  }
};