import { flow, splitByCharacter, splitByLine, sum } from "../utils";
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

  const findMatchingLetter = (items: string) => {
    const middle = items.length / 2;
    const first = items.slice(0, middle);
    const second = items.slice(middle);

    return (
      splitByCharacter(first).find((letter) => second.includes(letter)) || ""
    );
  };

  const result = flow(input_3).pipe(
    splitByLine,
    (items: string[]) => items.map(findMatchingLetter).map(letterToNumber),
    sum
  );

  console.log(result);
})();
