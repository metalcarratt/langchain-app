import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../../../bin/debug.html');
const dirPath = path.dirname(filePath);
const cssFilePath = path.resolve(__dirname, '../../assets/debug.css');
const cssDestinationPath = path.resolve(__dirname, '../../../bin/debug.css');
const htmlReport = (title, body) => `
<html>
    <head>
        <title>Debug Report</title>
        <link rel="stylesheet" href="debug.css">
    </head>
    <body>
        <h1>${title}</h1>
        <div class="report">
        ${body}
        </div>
    </body>
<html>
`;
const htmlSection = (title, section) => `
<div class="section">
    <h2>${title}</h2>
    <pre>${section}</pre>
</div>
`;
export const getDebugCollector = () => ({
    collection: [],
    collect(name, content) {
        this.collection.push({ name, content });
    },
    printReport() {
        const sections = this.collection.map(section => htmlSection(section.name, section.content)).join('');
        const html = htmlReport('Report', sections);
        fs.mkdirSync(dirPath, { recursive: true });
        fs.writeFileSync(filePath, html, 'utf8');
        fs.copyFileSync(cssFilePath, cssDestinationPath);
    }
});
//# sourceMappingURL=debug-collector.js.map