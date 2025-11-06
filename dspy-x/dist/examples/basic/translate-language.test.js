import { describe, test } from "vitest";
import { translateFn } from "./translate-language.js";
import { expectResponseKeys, expectSimilarity } from "../testing/helper.js";
describe.skip('translate language', () => {
    test('Korean to English', async () => {
        const response = await translateFn({
            text: '좋은 아침이에요',
            language: "English"
        });
        // console.log(response);
        expectResponseKeys(response.data, ['translation']);
        await expectSimilarity('Good morning', response.data.translation);
    });
    test('English to Chinese', async () => {
        const response = await translateFn({
            text: 'Good morning',
            language: "Chinese"
        });
        // console.log(response);
        expectResponseKeys(response.data, ['translation']);
        await expectSimilarity('早上好', response.data.translation);
    });
});
//# sourceMappingURL=translate-language.test.js.map