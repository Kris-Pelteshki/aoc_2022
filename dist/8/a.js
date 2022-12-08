"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const toGrid = (lines) => {
        const grid = lines.map((line) => line.split("").map(Number));
        return grid;
    };
    const gridHeights = (0, utils_1.flow)(input_1.default).pipe(utils_1.splitByLine, toGrid);
    const rows = gridHeights.length;
    const cols = gridHeights[0].length;
    const isVisibleFromOneSide = (rowIdx, colIdx) => {
        const row = gridHeights[rowIdx];
        const col = gridHeights.map((row) => row[colIdx]);
        const rowStart = row.slice(0, colIdx);
        const rowEnd = row.slice(colIdx + 1);
        const colStart = col.slice(0, rowIdx);
        const colEnd = col.slice(rowIdx + 1);
        const isRowVisible = rowStart.every((h) => h < row[colIdx]) ||
            rowEnd.every((h) => h < row[colIdx]);
        const isColVisible = colStart.every((h) => h < col[rowIdx]) ||
            colEnd.every((h) => h < col[rowIdx]);
        return isRowVisible || isColVisible;
    };
    const countVisibleFromTheSide = () => {
        let count = 0;
        for (let i = 1; i < rows - 1; i++) {
            for (let j = 1; j < cols - 1; j++) {
                if (isVisibleFromOneSide(i, j))
                    count++;
            }
        }
        return count;
    };
    const outside = rows * 2 + cols * 2 - 4;
    console.log(countVisibleFromTheSide() + outside);
})();
