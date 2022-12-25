import { splitByLine } from "../utils";
import input from "./input";

(function () {
  type Point = [number, number];

  const PointCloud = new Set<string>();
  const START_POINT: Point = [500, 0];
  const FLOOR_DISTANCE_FROM_MAX_Y = 2;
  let minX: number = START_POINT[0];
  let maxX: number = START_POINT[0];
  let minY: number = START_POINT[1];
  let maxY: number = START_POINT[1];

  const getPointsInLine = (x: number, y: number, x2: number, y2: number) => {
    const points: Point[] = [];
    const dx = Math.abs(x2 - x);
    const dy = Math.abs(y2 - y);
    const sx = x < x2 ? 1 : -1;
    const sy = y < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      points.push([x, y]);

      if (x === x2 && y === y2) {
        break;
      }

      const e2 = 2 * err;

      if (e2 > -dy) {
        err = err - dy;
        x = x + sx;
      }

      if (e2 < dx) {
        err = err + dx;
        y = y + sy;
      }
    }

    return points;
  };

  const getAllPointsFromEdges = (edges: Point[]): Point[] => {
    const points: Point[] = [];

    for (let i = 0; i < edges.length - 1; i++) {
      const [x, y] = edges[i];
      const [x2, y2] = edges[i + 1];

      points.push(...getPointsInLine(x, y, x2, y2));
    }

    return points;
  };

  const parseToPoint = (point: string): Point => {
    return point.split(",").map(Number) as Point;
  };

  const checkAndSetMinMax = (point: Point) => {
    const [x, y] = point;

    if (x < minX) {
      minX = x;
    }

    if (x > maxX) {
      maxX = x;
    }

    if (y < minY) {
      minY = y;
    }

    if (y > maxY) {
      maxY = y;
    }
  };

  const fillPointCloud = () => {
    splitByLine(input).forEach((line) => {
      const edges = line.split(" -> ").map(parseToPoint);
      const points = getAllPointsFromEdges(edges);

      points.forEach((point) => {
        checkAndSetMinMax(point);
        PointCloud.add(`${point[0]},${point[1]}`);
      });
    });

    // fill floor
    for (let i = minX - 1000; i <= maxX + 1000; i++) {
      PointCloud.add(`${i},${maxY + FLOOR_DISTANCE_FROM_MAX_Y}`);
    }
  };

  fillPointCloud();
  // console.log(minX, maxX, minY, maxY);
  // console.log(PointCloudMap);

  const isPointTaken = (x: number, y: number): boolean => {
    const pointKey = `${x},${y}`;
    return PointCloud.has(pointKey);
  };

  const isPointOutOfBounds = (x: number, y: number): boolean => {
    return x < minX || x > maxX || y < minY || y > maxY;
  };

  const run = () => {
    console.time("loop");

    let x = START_POINT[0];
    let y = START_POINT[1];
    let sandCount = 0;

    const resetToStart = () => {
      x = START_POINT[0];
      y = START_POINT[1];
      sandCount++;
    };

    while (true) {
      const nextY = y + 1;
      const isBlockedUnder = isPointTaken(x, nextY);

      if (!isBlockedUnder) {
        y = nextY;
        continue;
      }

      const isBlockedLeft = isPointTaken(x - 1, nextY);
      const isBlockedRight = isPointTaken(x + 1, nextY);

      if (isBlockedLeft && isBlockedRight) {
        if (y === START_POINT[1]) {
          break;
        }

        PointCloud.add(`${x},${y}`);
        resetToStart();
        continue;
      }

      if (!isBlockedLeft) {
        x -= 1;
        y += 1;
        continue;
      }

      if (!isBlockedRight) {
        x += 1;
        y += 1;
        continue;
      }
    }

    console.timeEnd("loop");
    console.log(sandCount + 1);
  };

  run();
})();
