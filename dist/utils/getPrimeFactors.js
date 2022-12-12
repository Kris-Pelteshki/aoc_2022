"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrimeFactors = void 0;
const getPrimeFactors = (num) => {
    const factors = new Set();
    let currentNum = num;
    let divisor = 2;
    while (currentNum >= 2) {
        if (currentNum % divisor === 0) {
            factors.add(divisor);
            currentNum = currentNum / divisor;
        }
        else {
            divisor++;
        }
    }
    return factors;
};
exports.getPrimeFactors = getPrimeFactors;
