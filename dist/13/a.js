"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const parseToPairs = (input) => {
        const lines = (0, utils_1.splitByLine)(input);
        const filteredLines = lines.filter((line) => line !== "");
        return (0, utils_1.chunks)(filteredLines, 2);
    };
    const compare = (a, b) => {
        if (typeof a === "number" && typeof b === "number") {
            if (a === b) {
                return 0;
            }
            return a < b ? 1 : -1;
        }
        if (typeof a === "undefined") {
            return 1;
        }
        if (typeof b === "undefined") {
            return -1;
        }
        if (Array.isArray(a) && typeof b === "number") {
            return compare(a, [b]);
        }
        if (typeof a === "number" && Array.isArray(b)) {
            return compare([a], b);
        }
        if (Array.isArray(a) && Array.isArray(b)) {
            const end = Math.max(a.length, b.length);
            for (let i = 0; i < end; i++) {
                const result = compare(a[i], b[i]);
                if (result !== 0)
                    return result;
            }
        }
        return 0;
    };
    const positiveIndicies = [];
    parseToPairs(input_1.default).forEach((pair, idx) => {
        const [a, b] = pair;
        const aParsed = JSON.parse(a);
        const bParsed = JSON.parse(b);
        if (compare(aParsed, bParsed) > 0) {
            positiveIndicies.push(idx + 1);
        }
    });
    const result = (0, utils_1.sum)(positiveIndicies);
    console.log(result);
})();
