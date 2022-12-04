"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersection = void 0;
const intersection = (setA, setB) => {
    const _intersection = new Set();
    setB.forEach((item) => {
        if (setA.has(item)) {
            _intersection.add(item);
        }
    });
    return _intersection;
};
exports.intersection = intersection;
