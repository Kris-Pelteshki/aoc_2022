"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const toRanges = (lines) => lines.map((line) => line.split(",").map((range) => {
        return range.split("-").map(Number);
    }));
    const hasOverlap = (setARange, setBRange) => {
        const [a1, a2] = setARange;
        const [b1, b2] = setBRange;
        if ((a2 >= b1 && a1 <= b1) || (b2 >= a1 && b1 <= a1)) {
            return true;
        }
        return false;
    };
    const sumOfOverlaps = (pairs) => {
        const counts = (0, utils_1.countBy)(pairs, (pair) => hasOverlap(pair[0], pair[1]));
        return counts.get(true);
    };
    const result = (0, utils_1.flow)(input_1.default).pipe(utils_1.splitByLine, toRanges, sumOfOverlaps);
    console.log(result);
})();
