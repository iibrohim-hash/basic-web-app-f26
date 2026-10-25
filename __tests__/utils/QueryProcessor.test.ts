import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return andrew id', () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("iibrohim");
    });

    test('should return the largest number', () => {
        expect(QueryProcessor("Which of the following numbers is the largest: 16, 85, 67?")).toBe("85");
    });

    test('should add two numbers', () => {
        expect(QueryProcessor("What is 81 plus 36?")).toBe("117");
    });

    test('should add three numbers', () => {
        expect(QueryProcessor("What is 34 plus 60 plus 24?")).toBe("118");
    });

    test('should return primes', () => {
        expect(QueryProcessor("Which of the following numbers are primes: 91, 69, 61, 6, 14?")).toBe("61");
    });

    test('should compute powers exactly', () => {
        expect(QueryProcessor("What is 2 to the power of 10?")).toBe("1024");
        expect(QueryProcessor("What is 60 to the power of 47?")).toBe("374204295122575954001453518729877913600000000000000000000000000000000000000000000000");
    });

    test('should respect operator precedence', () => {
        expect(QueryProcessor("What is 60 plus 64 multiplied by 36?")).toBe("2364");
        expect(QueryProcessor("What is 29 multiplied by 65 plus 76?")).toBe("1961");
    });

    test('should compute scrabble score', () => {
        expect(QueryProcessor("What is the scrabble score of zoo?")).toBe("12");
        expect(QueryProcessor("What is the scrabble score of september?")).toBe("15");
    });

    test('should find anagram', () => {
        expect(QueryProcessor("Which of the following is an anagram of listen: inlets, google, banana, enlists?")).toBe("inlets");
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "iroda"
          ));
    })
});