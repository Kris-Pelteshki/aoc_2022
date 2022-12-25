import { chunks, splitByLine, sum } from "../utils";
import input from "./input";

(function () {
  type InputType = number | number[] | InputType[];

  const parseToPairs = (input: string): [string, string][] => {
    const lines = splitByLine(input);
    const filteredLines = lines.filter((line) => line !== "");
    return chunks(filteredLines, 2) as [string, string][];
  };

  const compare = (a: InputType, b: InputType): number => {
    if (typeof a === "number" && typeof b === "number") {
      if (a === b) {
        return 0;
      }
      return a < b ? 1 : -1;
    }

    if (typeof a === "undefined") {
      return 1;
    }

    if (typeof b === "undefined") {
      return -1;
    }

    if (Array.isArray(a) && typeof b === "number") {
      return compare(a, [b]);
    }

    if (typeof a === "number" && Array.isArray(b)) {
      return compare([a], b);
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      const end = Math.max(a.length, b.length);

      for (let i = 0; i < end; i++) {
        const result = compare(a[i], b[i]);
        if (result !== 0) return result;
      }
    }

    return 0;
  };

  const positiveIndicies: number[] = [];

  parseToPairs(input).forEach((pair, idx) => {
    const [a, b] = pair;
    const aParsed: InputType = JSON.parse(a);
    const bParsed: InputType = JSON.parse(b);

    if (compare(aParsed, bParsed) > 0) {
      positiveIndicies.push(idx + 1);
    }
  });

  const result = sum(positiveIndicies);
  console.log(result);
})();
