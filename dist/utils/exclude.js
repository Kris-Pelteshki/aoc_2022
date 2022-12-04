"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclude = void 0;
const exclude = (setA, setB) => {
    const _difference = new Set(setA);
    setB.forEach((item) => {
        _difference.delete(item);
    });
    return _difference;
};
exports.exclude = exclude;
