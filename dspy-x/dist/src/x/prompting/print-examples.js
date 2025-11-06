import { firstLetterUppercase } from "../util.js";
export const printExamples = (examples) => {
    return examples.map((example, index) => {
        const inputs = Object.entries(example.given)
            .map(([key, value]) => firstLetterUppercase(key) + ": " + parseTypeForValue(value))
            .join('\n');
        const outputs = Object.entries(example.expect)
            .map(([key, value]) => firstLetterUppercase(key) + ": " + parseTypeForValue(value))
            .join('\n');
        return `
### Example ${index + 1} ${example.incorrect ? `[Bad example - response is wrong because ${example.incorrect}]` : ''}:
Given:
'''
${inputs}
'''

Return:
'''
${outputs}
'''

        `;
    }).join('\n');
};
const parseTypeForValue = (value) => {
    if (typeof value === 'boolean') {
        if (value === true)
            return 'True';
        else
            return 'False';
    }
    return `${value}`;
};
//# sourceMappingURL=print-examples.js.map