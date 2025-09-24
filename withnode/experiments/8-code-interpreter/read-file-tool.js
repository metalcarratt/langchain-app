import { tool } from '@langchain/core/tools';
import fs from 'fs/promises';
import { z } from 'zod';

// const readFileTool = new DynamicTool({
//     name: 'read_file',
//     description: 'Reads the contents of a local file. Input should be a relative file path.',
//     func: async (filePath) => {
//       console.log(`Request for file ${filePath}`);
//         try {
//             const content = await fs.readFile(filePath, 'utf-8');
//             const msg = `Contents of ${filePath}:\n\n${content}`;
//             console.log('msg', msg);
//             return msg;
//         } catch (err) {
//             const error = `Error reading ${filePath}: ${err.message}`;
//             console.log('error', error);
//             return error;
//         }
//     }
// });

export const readFileTool = tool(
  async ({filePath}) => {
    console.log(`[readFileTool] Request for file ${filePath}`);
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const msg = `Contents of ${filePath}:\n\n${content}`;
        // console.log('msg', msg);
        return msg;
    } catch (err) {
        const error = `Error reading ${filePath}: ${err.message}`;
        console.log('error', error);
        return error;
    }
  },
  {
    name: 'read file',
    description: 'Reads the contents of a local file',
    schema: z.object({
      filePath: z.string().describe('A relative file path')
    })
  }
);