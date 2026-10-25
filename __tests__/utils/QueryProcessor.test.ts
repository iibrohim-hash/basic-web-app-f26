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

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "iroda"
          ));
    })
});