// scripts/copy-assets.ts
import { copyFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssSource = resolve(__dirname, '../assets/debug.css');
const cssDestination = resolve(__dirname, '../../dist/assets/debug.css');
const jsSource = resolve(__dirname, '../assets/debug.js');
const jsDestination = resolve(__dirname, '../../dist/assets/debug.js');
mkdirSync(dirname(cssDestination), { recursive: true });
copyFileSync(cssSource, cssDestination);
copyFileSync(jsSource, jsDestination);
//# sourceMappingURL=copy-assets.js.map