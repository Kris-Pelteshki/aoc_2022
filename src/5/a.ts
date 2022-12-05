import { splitByLine } from "../utils";
import input from "./input";

(function () {
  const lines = splitByLine(input);
  const stackNumbersLineIndex = lines.findIndex((line) => line === "") - 1;
  const lineOfStackNumber = lines[stackNumbersLineIndex];
  const stackLines = lines.slice(0, stackNumbersLineIndex);
  const instructionLines = lines.slice(stackNumbersLineIndex + 2);
  const charPositions: number[] = [];

  lineOfStackNumber.split("").forEach((char, i) => {
    if (char !== " ") {
      charPositions.push(i);
    }
  });

  const stacks = new Map<number, string[]>();

  stackLines.forEach((line) => {
    charPositions.forEach((charPos, stackIdx) => {
      const stackKey = stackIdx + 1;
      const stack = stacks.get(stackKey) || [];
      const val = line[charPos];

      if (val !== " ") {
        stack.push(val);
        stacks.set(stackKey, stack);
      }
    });
  });

  instructionLines.forEach((line) => {
    const [move, from, to] = line.split(" ").filter(Number).map(Number);

    const fromStack = stacks.get(from);
    const toStack = stacks.get(to);

    if (fromStack && toStack) {
      const moved = fromStack.splice(0, move);
      toStack.unshift(...moved.slice().reverse());
    }
  });

  const result = Array.from(stacks.entries())
    .sort((a, b) => a[0] - b[0])
    .reduce((str, [_, stack]) => {
      str += stack[0];
      return str;
    }, "");

  console.log(result);
})();
