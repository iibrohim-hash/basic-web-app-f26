export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  const largest = query.match(/largest:\s*([\d,\s]+)\?/i);
  if (largest) {
    const nums = largest[1].split(",").map((n) => parseInt(n.trim(), 10));
    return Math.max(...nums).toString();
  }

  const plus = query.match(/what is (\d+) plus (\d+)/i);
  if (plus) {
    return (parseInt(plus[1], 10) + parseInt(plus[2], 10)).toString();
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
