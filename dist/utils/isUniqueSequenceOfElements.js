"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUniqueSequenceOfElements = void 0;
const isUniqueSequenceOfElements = (input) => {
    return new Set(input).size === input.length;
};
exports.isUniqueSequenceOfElements = isUniqueSequenceOfElements;
