import { flow, splitByLine } from "../utils";
import input from "./input";

(function () {
  type Direction = "R" | "U" | "L" | "D";
  type Step = [Direction, number];
  type Point = [number, number];
  type Box = [Point, Point];

  const parseStep = (step: string): Step => {
    const [direction, distance] = step.split(" ") as [Direction, string];
    return [direction, parseInt(distance, 10)];
  };

  const parseSteps = (steps: string[]): Step[] => steps.map(parseStep);

  const nextPoint = (point: Point, step: Step): Point => {
    const [direction, distance] = step;
    const [x, y] = point;

    switch (direction) {
      case "R":
        return [x + distance, y];
      case "U":
        return [x, y + distance];
      case "L":
        return [x - distance, y];
      case "D":
        return [x, y - distance];
    }
  };

  const getBoxAroundPoint = (point: Point, radius: number = 1): Box => {
    const [x, y] = point;
    return [
      [x - radius, y - radius],
      [x + radius, y + radius],
    ];
  };

  const isPointInBox = (point: Point, box: Box): boolean => {
    const [x, y] = point;
    const [[x1, y1], [x2, y2]] = box;

    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
  };

  const runSteps = (steps: Step[]) => {
    let currentHeadPoint: Point = [0, 0];
    let currentTailPoint: Point = [0, 0];
    const visitedPoints = new Set<string>([currentHeadPoint.join(",")]);

    for (const step of steps) {
      const [direction, distance] = step;

      for (let i = 0; i < distance; i++) {
        const nextHeadPoint = nextPoint(currentHeadPoint, [direction, 1]);
        const box = getBoxAroundPoint(currentTailPoint);

        if (!isPointInBox(nextHeadPoint, box)) {
          currentTailPoint = currentHeadPoint;
          visitedPoints.add(currentHeadPoint.join(","));
        }

        currentHeadPoint = nextHeadPoint;
      }
    }

    return visitedPoints.size;
  };

  const result = flow(input).pipe(splitByLine, parseSteps, runSteps);

  console.log(result);
})();
