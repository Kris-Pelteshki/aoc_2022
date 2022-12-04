import { countBy, flow, splitByLine } from "../utils";
import input from "./input";

(function () {
  type Range = [number, number];
  type RangeLine = [Range, Range];

  const toRanges = (lines: string[]): RangeLine[] =>
    lines.map(
      (line) =>
        line.split(",").map((range) => {
          return range.split("-").map(Number) as Range;
        }) as RangeLine
    );

  const isSubset = (setARange: Range, setBRange: Range): boolean => {
    const [a1, a2] = setARange;
    const [b1, b2] = setBRange;

    if ((a1 <= b1 && a2 >= b2) || (a1 >= b1 && a2 <= b2)) {
      return true;
    }

    return false;
  };

  const sumOfSubsets = (pairs: RangeLine[]) => {
    const counts = countBy(pairs, (pair) => isSubset(pair[0], pair[1]));
    return counts.get(true);
  };

  const result = flow(input).pipe(splitByLine, toRanges, sumOfSubsets);

  console.log(result);
})();
