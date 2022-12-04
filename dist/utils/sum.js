"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = void 0;
const sum = (nums) => {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    return total;
};
exports.sum = sum;
