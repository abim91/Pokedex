import { cleanFunction } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([{
    input: " hello world ",
    expected: ["hello", "world"],
},
{
    input: " It is raining cats and dogs",
    expected: ["It", "is", "raining", "cats", "and", "dogs"]
}, {

    input: "huskies are the best breed of dogs ",
    expected: ["huskies", "are", "the", "best", "breed", "of", "dogs"]
}

])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanFunction(input);
        console.log(actual);
        expect(actual).toHaveLength(expected.length);

        for (const i in expected) {
            // likewise, the `toBe` function will fail the test if the values are not equal
            expect(actual[i]).toBe(expected[i]);
        }
    });
});

