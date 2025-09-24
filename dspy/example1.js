import { configureLM } from 'dspy-ts';
import { defineModule } from 'dspy-ts/core/factory.js';
import { OllamaModel } from './ollama-model.js';

configureLM(new OllamaModel());

// class BarePredict extends PredictModule {
//     constructor() {
//         super({
//             name: 'BarePredict',
//             signature: {
//                 inputs: [{ name: 'question', type: 'string'}],
//                 outputs: [{name: 'answer', type: 'string'}]
//             },
//             promptTemplate(input) {
//                 return `Answer the following question:\n${input.question}`;
//             }
//         })
//     }
// }

const maths = defineModule({
    name: 'maths predict',
    signature: {
        inputs: [{ name: 'question', type: 'string'}],
        outputs: [{name: 'answer', type: 'string'}]
    },
    promptTemplate({question}) {
        return `Answer the following question:\n${question}`;
    }
});


(async () => {
    // const predict = new BarePredict();
    const result = await maths.run({ question: 'What is 6 times 7?'});
    console.log('answer', result.answer);
})();