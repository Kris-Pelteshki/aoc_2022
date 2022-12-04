"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunks = void 0;
const chunks = (arr, amountPerChunk) => {
    const result = [];
    for (let i = 0; i < arr.length; i += amountPerChunk) {
        result.push(arr.slice(i, i + amountPerChunk));
    }
    return result;
};
exports.chunks = chunks;
