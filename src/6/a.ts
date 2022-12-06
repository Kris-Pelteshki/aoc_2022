import { flow, isUniqueSequenceOfElements } from "../utils";
import input from "./input";

(function () {
  const processData = (data: string, sequenceLength = 4) => {
    const startIndex = data
      .split("")
      .findIndex((_, i) =>
        isUniqueSequenceOfElements(data.slice(i, i + sequenceLength))
      );

    return startIndex !== -1 ? startIndex + sequenceLength : -1;
  };

  const result = flow(input).pipe(processData);

  console.log(result);
})();
