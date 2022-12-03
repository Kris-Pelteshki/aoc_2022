"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flow = exports.chunks = exports.splitByCharacter = exports.splitByLine = exports.splitBySpace = exports.sum = void 0;
const sum = (nums) => {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    return total;
};
exports.sum = sum;
const splitBy = (seperator) => (str) => str.split(seperator);
exports.splitBySpace = splitBy(" ");
exports.splitByLine = splitBy("\n");
exports.splitByCharacter = splitBy("");
function* chunksGen(arr, amountPerChunk) {
    for (let i = 0; i < arr.length; i += amountPerChunk) {
        yield arr.slice(i, i + amountPerChunk);
    }
}
const chunks = (arr, amountPerChunk) => {
    const iterator = chunksGen(arr, amountPerChunk);
    return [...iterator];
};
exports.chunks = chunks;
const flow = (input) => {
    return {
        pipe(...funcs) {
            return funcs.reduce((result, fn) => fn(result), input);
        },
    };
};
exports.flow = flow;
