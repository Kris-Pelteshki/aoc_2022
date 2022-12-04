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
    const isSubset = (setARange, setBRange) => {
        const [a1, a2] = setARange;
        const [b1, b2] = setBRange;
        if ((a1 <= b1 && a2 >= b2) || (a1 >= b1 && a2 <= b2)) {
            return true;
        }
        return false;
    };
    const sumOfSubsets = (pairs) => {
        let total = 0;
        pairs.forEach((pair) => {
            if (isSubset(pair[0], pair[1])) {
                total++;
            }
        });
        return total;
    };
    const result = (0, utils_1.flow)(input_1.default).pipe(utils_1.splitByLine, toRanges, sumOfSubsets);
    console.log(result);
})();
