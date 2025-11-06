export const getToolingPrompt = (signature, userInput, tools, toolContext) => {
    const toolInstructions = tools.map(tool => {
        const schema = tool.inputSchema;
        const schemaText = schema ? printInputSchema(schema) : '  • (no input)';
        return `- ${tool.name}: ${tool.description}\n${schemaText}`;
    });
    const expectedOutputs = Object.keys(signature.outputs.shape).join(', ');
    const providedInputs = Object.keys(signature.inputs.shape)
        .map(inputName => `- ${inputName}: ${userInput[inputName]}`)
        .join('\n');
    return `
Your task is to help prepare the prompt for another model by reviewing what the
user wants, what context has been provided, and whether any tools need to be called
to get additional context. 

First review what the user has provided and is expecting below. Then look at what
context has already been provided by tooling. Finally look at the list of tools
and decide if you need to call another tool in order to get more context.

The user wants to ${signature.action} and is expecting to see ${expectedOutputs}.
The user has provided:
${providedInputs}

Context already provided by other tools:
'''
${toolContext}
'''

List of tools:
'''
${toolInstructions}
'''

To call a tool respond with exactly the following format in triple quotes:
'''
Finished: False
Call: [tool name]
Args: [JSON object matching the tool's input schema]
'''

Or, if you think enough context has been provided, respond with exactly the following format in triple quotes:
'''
Finished: True
'''
    `;
};
const printInputSchema = (schema) => {
    const shape = schema.shape;
    return Object.entries(shape)
        .map(([key, value]) => {
        const zodType = value;
        const typeName = zodType._def.typeName;
        const desc = zodType.description ? ` - ${zodType.description}` : '';
        return `  • ${key}: ${typeName}${desc}`;
    })
        .join('\n');
};
//# sourceMappingURL=get-tooling-prompt.js.map