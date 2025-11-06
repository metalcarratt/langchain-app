import { similarityTestFn } from "./examples/testing/similarity-test.js";
import { translateFn } from "./examples/basic/translate-language.js";
import { createPrompt } from "./x/create-prompt.js";
import { numberQuestionFn } from "./examples/basic/answer-with-number.js";
import { checkEmail } from "./examples/basic/email-checker.js";
import { formatTodaysDate } from "./examples/tooling/format-todays-date.js";
import { sortList } from "./examples/tooling/sort-list.js";
// const response = await answerMatches({
//     answer: 'dog',
//     question: "What is 4+5?"
// }, true);
// console.log(response);
// createPrompt(answerMatchesSchema, {
//     answer: 'dog',
//     question: "What is 4+5?"
// }, true);
// const question = "How many cats are in a typical litter?";
//         const response = await numberQuestionFn({question}, true);
//         console.log(response);
const response = await similarityTestFn({
    provided: 'Good morning',
    expected: "Hello"
}, true);
console.log(response);
// const response = await formatTodaysDate({format: 'Day Month Year'}, true);
// console.log(response);
// const response = await sortList({items: [9,5,7,21,64,8,2]}, true);
// console.log(response);
//# sourceMappingURL=index.js.map