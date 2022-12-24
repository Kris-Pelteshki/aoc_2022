"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const pathFinding_1 = require("../utils/pathFinding");
const input_1 = __importDefault(require("./input"));
(function () {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const alphabetMap = alphabet.split("").reduce((acc, letter, index) => {
        acc.set(letter, index + 1);
        return acc;
    }, new Map());
    let startLocation = [0, 0];
    let endLocation = [0, 0];
    const lowestPoints = [];
    const START_HEIGHT = alphabetMap.get("a");
    const END_HEIGHT = alphabetMap.get("z");
    const MAX_HEIGHT_INCREMENT = 1;
    const letterToNumber = (letter, x, y) => {
        if (letter === "S") {
            startLocation = [x, y];
            lowestPoints.push([x, y]);
            return START_HEIGHT;
        }
        if (letter === "E") {
            endLocation = [x, y];
            return END_HEIGHT;
        }
        if (letter === "a") {
            lowestPoints.push([x, y]);
        }
        return alphabetMap.get(letter);
    };
    const parseToNumberGrid = (input) => {
        const lines = (0, utils_1.splitByLine)(input);
        const grid = [];
        lines.forEach((line, y) => {
            grid[y] = [];
            (0, utils_1.splitByCharacter)(line).forEach((letter, x) => {
                grid[y][x] = letterToNumber(letter, x, y);
            });
        });
        return grid;
    };
    const grid = parseToNumberGrid(input_1.default);
    const pathFinder = new pathFinding_1.PathFinding(grid, (0, pathFinding_1.createGetNeighborsStrategy)((currentHeight, neighborHeight) => currentHeight >= neighborHeight - MAX_HEIGHT_INCREMENT));
    const lowestPointPaths = lowestPoints.map((lowestPoint) => {
        return pathFinder.findShortestPath(lowestPoint, endLocation);
    });
    const pathLengths = lowestPointPaths
        .map((path) => (path?.length ? path?.length - 1 : 0))
        .filter((length) => length > 0);
    const shortestPath = Math.min(...pathLengths);
    console.log(shortestPath);
})();
