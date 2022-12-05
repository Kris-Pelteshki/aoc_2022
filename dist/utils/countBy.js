"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countBy = void 0;
const countBy = (iterable, fn) => {
    const map = new Map();
    for (const elem of iterable) {
        const mapKey = fn(elem);
        const count = map.get(mapKey) || 0;
        map.set(mapKey, count + 1);
    }
    return map;
};
exports.countBy = countBy;
