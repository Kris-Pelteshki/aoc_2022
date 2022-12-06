import { flow, isUniqueSequenceOfElements } from "../utils";
import input from "./input";

(function () {
  const processData = (data: string, sequenceLength = 4) => {
    const sequenceStartIndex = data
      .split("")
      .findIndex((_, i) =>
        isUniqueSequenceOfElements(data.slice(i, i + sequenceLength))
      );

    return sequenceStartIndex + sequenceLength;
  };

  const result = flow(input).pipe(processData);

  console.log(result);
})();
