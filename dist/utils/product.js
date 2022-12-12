"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const product = (arr) => {
    let result = 1;
    for (const num of arr) {
        result *= num;
    }
    return result;
};
exports.product = product;
