"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const parseStep = (step) => {
        const [direction, distance] = step.split(" ");
        return [direction, parseInt(distance, 10)];
    };
    const parseSteps = (steps) => steps.map(parseStep);
    const nextPoint = (point, step) => {
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
    const getBoxAroundPoint = (point, radius = 1) => {
        const [x, y] = point;
        return [
            [x - radius, y - radius],
            [x + radius, y + radius],
        ];
    };
    const isPointInBox = (point, box) => {
        const [x, y] = point;
        const [[x1, y1], [x2, y2]] = box;
        return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    };
    const differenceBetweenPoints = (point1, point2) => {
        const [x1, y1] = point1;
        const [x2, y2] = point2;
        return [x1 - x2, y1 - y2];
    };
    const runSteps = (steps) => {
        const initialPoint = [0, 0];
        const ropeLength = 10;
        const points = new Array(ropeLength).fill(initialPoint);
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
                        const [x, y] = [
                            Math.sign(dx) * Math.min(1, Math.abs(dx)),
                            Math.sign(dy) * Math.min(1, Math.abs(dy)),
                        ];
                        points[j] = [point[0] + x, point[1] + y];
                        if (j === points.length - 1) {
                            visitedPoints.push(points[j]);
                        }
                    }
                }
            }
        }
        const makeGraph = (points) => {
            const rangeX = 30;
            const rangeY = 30;
            const centerX = Math.floor(rangeX / 2);
            const centerY = Math.floor(rangeY / 2);
            const graph = new Array(rangeX)
                .fill(0)
                .map(() => new Array(rangeY).fill("-"));
            for (const [x, y] of points) {
                graph[y + centerX][x + centerY] = "#";
            }
            return graph
                .reverse()
                .map((row) => row.join(""))
                .join("\n");
        };
        // console.log(makeGraph(visitedPoints));
        return new Set(visitedPoints.map((p) => p.join(","))).size;
    };
    const result = (0, utils_1.flow)(input_1.default).pipe(utils_1.splitByLine, parseSteps, runSteps);
    console.log(result);
})();
