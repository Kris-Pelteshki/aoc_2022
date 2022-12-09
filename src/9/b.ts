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

  const differenceBetweenPoints = (point1: Point, point2: Point): Point => {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    return [x1 - x2, y1 - y2];
  };

  const runSteps = (steps: Step[]) => {
    const initialPoint: Point = [0, 0];
    const ropeLength = 10;
    const points: Point[] = new Array(ropeLength).fill(initialPoint);
    const visitedPoints = [initialPoint];

    for (const step of steps) {
      const [direction, distance] = step;

      for (let i = 0; i < distance; i++) {
        points[0] = nextPoint(points[0], [direction, 1]);

        for (let j = 1; j < points.length; j++) {
          const pointInfront = points[j - 1];
          const point = points[j];
          const box = getBoxAroundPoint(point);

          if (!isPointInBox(pointInfront, box)) {
            const [dx, dy] = differenceBetweenPoints(pointInfront, point);
            const x = Math.sign(dx) * Math.min(1, Math.abs(dx));
            const y = Math.sign(dy) * Math.min(1, Math.abs(dy));

            points[j] = [point[0] + x, point[1] + y];

            if (j === points.length - 1) {
              visitedPoints.push(points[j]);
            }
          }
        }
      }
    }

    const makeGraph = (points: Point[]) => {
      const rangeX = 260;
      const rangeY = 1000;
      const centerX = Math.floor(rangeX / 2);
      const centerY = Math.floor(rangeY / 2);

      const graph = new Array(rangeX)
        .fill(0)
        .map(() => new Array(rangeY).fill("."));

      for (const [x, y] of points) {
        graph[y + centerX][x + centerY] = "#";
      }

      return graph
        .reverse()
        .map((row) => row.join("").slice(65, 550))
        .slice(0, 200)
        .join("\n");
    };
    // console.log(makeGraph(visitedPoints));
    return new Set(visitedPoints.map((p) => p.join(","))).size;
  };

  const result = flow(input).pipe(splitByLine, parseSteps, runSteps);

  console.log(result);
})();
