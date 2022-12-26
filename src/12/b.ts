import { splitByCharacter, splitByLine } from "../utils";
import {
  createGetNeighborsStrategy,
  Grid,
  PathFinding,
  Point,
} from "../utils/pathFinding";
import input from "./input";

(function () {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetMap = alphabet.split("").reduce((acc, letter, index) => {
    acc.set(letter, index + 1);
    return acc;
  }, new Map());

  let startLocation: Point = [0, 0];
  let endLocation: Point = [0, 0];
  const lowestPoints: Point[] = [];

  const START_HEIGHT = alphabetMap.get("a");
  const END_HEIGHT = alphabetMap.get("z");
  const MAX_HEIGHT_INCREMENT = 1;

  const letterToNumber = (letter: string, x: number, y: number): number => {
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

  const parseToNumberGrid = (input: string): Grid<number> => {
    const lines = splitByLine(input);
    const grid: Grid<number> = [];

    lines.forEach((line, y) => {
      grid[y] = [];
      splitByCharacter(line).forEach((letter, x) => {
        grid[y][x] = letterToNumber(letter, x, y);
      });
    });

    return grid;
  };

  const grid = parseToNumberGrid(input);

  const pathFinder = new PathFinding(
    grid,
    createGetNeighborsStrategy(
      (currentHeight, neighborHeight) =>
        currentHeight >= neighborHeight - MAX_HEIGHT_INCREMENT
    )
  );

  const lowestPointPaths = lowestPoints.map((lowestPoint) => {
    return pathFinder.findPath(lowestPoint, endLocation);
  });

  const pathLengths = lowestPointPaths
    .map((path) => (path?.length ? path?.length - 1 : 0))
    .filter((length) => length > 0);

  const shortestPath = Math.min(...pathLengths);

  console.log(shortestPath);
})();
