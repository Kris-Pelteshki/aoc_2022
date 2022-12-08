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

  const isVisibleFromOneSide = (rowIdx: number, colIdx: number) => {
    const row = gridHeights[rowIdx];
    const col = gridHeights.map((row) => row[colIdx]);

    const rowStart = row.slice(0, colIdx);
    const rowEnd = row.slice(colIdx + 1);
    const colStart = col.slice(0, rowIdx);
    const colEnd = col.slice(rowIdx + 1);

    const isRowVisible =
      rowStart.every((h) => h < row[colIdx]) ||
      rowEnd.every((h) => h < row[colIdx]);
    const isColVisible =
      colStart.every((h) => h < col[rowIdx]) ||
      colEnd.every((h) => h < col[rowIdx]);

    return isRowVisible || isColVisible;
  };

  const countVisibleFromTheSide = () => {
    let count = 0;
    for (let i = 1; i < rows - 1; i++) {
      for (let j = 1; j < cols - 1; j++) {
        if (isVisibleFromOneSide(i, j)) count++;
      }
    }
    return count;
  };

  const outside = rows * 2 + cols * 2 - 4;

  console.log(countVisibleFromTheSide() + outside);
})();
