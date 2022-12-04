import { flow, splitByLine } from "../utils";
import input from "./input";

(function () {
  const result = flow(input).pipe(splitByLine);

  console.log(result);
})();
