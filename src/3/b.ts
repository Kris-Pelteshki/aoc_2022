import { chunks, flow, splitByCharacter, splitByLine, sum } from "../utils";
import { input_3 } from "./input";

(function () {
  const ACharCode = "a".charCodeAt(0);
  const ACapitalCaseCharCode = "A".charCodeAt(0);
  const isLowerCase = (letter: string) => letter.toLowerCase() === letter;

  const letterToNumber = (letter: string) => {
    const decrement = isLowerCase(letter)
      ? ACharCode
      : ACapitalCaseCharCode - 26;
    return 1 + letter.charCodeAt(0) - decrement;
  };

  const matchInGroup = (group: string[]) => {
    const [first, ...rest] = group;

    return (
      splitByCharacter(first).find((letter) =>
        rest.every((elf) => elf.includes(letter))
      ) || ""
    );
  };

  const result = flow(input_3).pipe(
    splitByLine,
    (lines: string[]) => chunks(lines, 3),
    (groups: string[][]) => groups.map(matchInGroup).map(letterToNumber),
    sum
  );

  console.log(result);
})();
