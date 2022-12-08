import { flow, splitByLine } from "../utils";
import input from "./input";

(function () {
  const toGrid = (lines: string[]) => {
    const grid = lines.map((line) => line.split("").map(Number));
    return grid;
  };

  const gridHeights = flow(input).pipe(splitByLine, toGrid);

  const rows = gridHeights.length;
  const cols = gridHeights[0].length;

  const distanceBeforeObstacle = (direction: number[], height: number) => {
    let distance = 0;

    for (let i = 0; i < direction.length; i++) {
      distance++;
      if (direction[i] >= height) break;
    }
    return distance;
  };

  const distanceInAllDirections = (rowIdx: number, colIdx: number): number => {
    const row = gridHeights[rowIdx];
    const col = gridHeights.map((row) => row[colIdx]);

    const rowStart = row.slice(0, colIdx).reverse();
    const rowEnd = row.slice(colIdx + 1);
    const colStart = col.slice(0, rowIdx).reverse();
    const colEnd = col.slice(rowIdx + 1);

    const left = distanceBeforeObstacle(rowStart, row[colIdx]);
    const right = distanceBeforeObstacle(rowEnd, row[colIdx]);
    const up = distanceBeforeObstacle(colStart, col[rowIdx]);
    const down = distanceBeforeObstacle(colEnd, col[rowIdx]);

    return left * right * up * down;
  };

  const countHighestScore = () => {
    let highScore = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const score = distanceInAllDirections(i, j);
        if (score > highScore) highScore = score;
      }
    }

    return highScore;
  };

  console.log(countHighestScore());
})();
