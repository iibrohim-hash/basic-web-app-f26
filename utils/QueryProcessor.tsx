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

  const sum = query.match(/what is (\d+(?:\s+plus\s+\d+)+)/i);
  if (sum) {
    return sum[1]
      .split(/\s+plus\s+/i)
      .reduce((total, n) => total + parseInt(n, 10), 0)
      .toString();
  }

  const times = query.match(/what is (\d+) multiplied by (\d+)/i);
  if (times) {
    return (parseInt(times[1], 10) * parseInt(times[2], 10)).toString();
  }

  const minus = query.match(/what is (\d+) minus (\d+)/i);
  if (minus) {
    return (parseInt(minus[1], 10) - parseInt(minus[2], 10)).toString();
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
