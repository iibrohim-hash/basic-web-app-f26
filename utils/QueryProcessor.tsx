const LETTER_SCORES: { [letter: string]: number } = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
  n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
};

function scrabbleScore(word: string): number {
  return word
    .toLowerCase()
    .split("")
    .reduce((total, letter) => total + (LETTER_SCORES[letter] ?? 0), 0);
}

function sortLetters(word: string): string {
  return word.toLowerCase().split("").sort().join("");
}

// Evaluates "a plus b multiplied by c ..." with multiplication/division first.
function evaluate(expression: string): number {
  const tokens = expression
    .toLowerCase()
    .replace(/multiplied by|times/g, "*")
    .replace(/divided by/g, "/")
    .replace(/plus/g, "+")
    .replace(/minus/g, "-")
    .split(/\s+/);
  const terms: number[] = [parseInt(tokens[0], 10)];
  const ops: string[] = [];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const value = parseInt(tokens[i + 1], 10);
    if (op === "*") {
      terms[terms.length - 1] *= value;
    } else if (op === "/") {
      terms[terms.length - 1] /= value;
    } else {
      ops.push(op);
      terms.push(value);
    }
  }
  return terms.slice(1).reduce(
    (total, value, i) => (ops[i] === "+" ? total + value : total - value),
    terms[0]
  );
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  const list = query.match(/:\s*([\d,\s]+)\?/);
  const numbers = list ? list[1].split(",").map((n) => parseInt(n.trim(), 10)) : [];

  if (/largest/i.test(query) && numbers.length > 0) {
    return Math.max(...numbers).toString();
  }

  if (/smallest/i.test(query) && numbers.length > 0) {
    return Math.min(...numbers).toString();
  }

  if (/primes?/i.test(query) && numbers.length > 0) {
    return numbers.filter(isPrime).join(", ");
  }

  const power = query.match(/what is (\d+) to the power of (\d+)/i);
  if (power) {
    const base = BigInt(power[1]);
    let result = BigInt(1);
    for (let i = 0; i < parseInt(power[2], 10); i++) {
      result = result * base;
    }
    return result.toString();
  }

  const expression = query.match(
    /what is (\d+(?:\s+(?:plus|minus|multiplied by|times|divided by)\s+\d+)+)\s*\?/i
  );
  if (expression) {
    return evaluate(expression[1]).toString();
  }

  const scrabble = query.match(/scrabble score of (\w+)/i);
  if (scrabble) {
    return scrabbleScore(scrabble[1]).toString();
  }

  const anagram = query.match(/anagram of (\w+):\s*([^?]+)\?/i);
  if (anagram) {
    const target = anagram[1].toLowerCase();
    const match = anagram[2]
      .split(",")
      .map((w) => w.trim())
      .find((w) => w.toLowerCase() !== target && sortLetters(w) === sortLetters(target));
    return match ?? "";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "iibrohim";
  }

  if (query.toLowerCase().includes("name")) {
    return "iroda";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }



  return "";
}
