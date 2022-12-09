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
    const runSteps = (steps) => {
        let currentHeadPoint = [0, 0];
        let currentTailPoint = [0, 0];
        const visitedPoints = new Set([currentHeadPoint.join(",")]);
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
    const result = (0, utils_1.flow)(input_1.default).pipe(utils_1.splitByLine, parseSteps, runSteps);
    console.log(result);
})();
