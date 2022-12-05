"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const lines = (0, utils_1.splitByLine)(input_1.default);
    const stackNumbersLineIndex = lines.findIndex((line) => line === "") - 1;
    const lineOfStackNumber = lines[stackNumbersLineIndex];
    const stackLines = lines.slice(0, stackNumbersLineIndex);
    const instructionLines = lines.slice(stackNumbersLineIndex + 2);
    const charPositions = [];
    lineOfStackNumber.split("").forEach((char, i) => {
        if (char !== " ") {
            charPositions.push(i);
        }
    });
    const stacks = new Map();
    stackLines.forEach((line) => {
        charPositions.forEach((charPos, stackIdx) => {
            const stackKey = stackIdx + 1;
            const stack = stacks.get(stackKey) || [];
            const val = line[charPos];
            if (val !== " ") {
                stack.push(val);
                stacks.set(stackKey, stack);
            }
        });
    });
    instructionLines.forEach((line) => {
        const [move, from, to] = line.split(" ").filter(Number).map(Number);
        const fromStack = stacks.get(from);
        const toStack = stacks.get(to);
        if (fromStack && toStack) {
            const moved = fromStack.splice(0, move);
            toStack.unshift(...moved.slice().reverse());
        }
    });
    const result = Array.from(stacks.entries())
        .sort((a, b) => a[0] - b[0])
        .reduce((str, [_, stack]) => {
        str += stack[0];
        return str;
    }, "");
    console.log(result);
})();
