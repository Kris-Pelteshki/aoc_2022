"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunks = void 0;
function* chunksGen(arr, amountPerChunk) {
    for (let i = 0; i < arr.length; i += amountPerChunk) {
        yield arr.slice(i, i + amountPerChunk);
    }
}
const chunks = (arr, amountPerChunk) => {
    return [...chunksGen(arr, amountPerChunk)];
};
exports.chunks = chunks;
