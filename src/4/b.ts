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

  const hasOverlap = (setARange: Range, setBRange: Range): boolean => {
    const [a1, a2] = setARange;
    const [b1, b2] = setBRange;

    if ((a2 >= b1 && a1 <= b1) || (b2 >= a1 && b1 <= a1)) {
      return true;
    }

    return false;
  };

  const sumOfOverlaps = (pairs: RangeLine[]) => {
    const counts = countBy(pairs, (pair) => hasOverlap(pair[0], pair[1]));
    return counts.get(true);
  };

  const result = flow(input).pipe(splitByLine, toRanges, sumOfOverlaps);

  console.log(result);
})();
