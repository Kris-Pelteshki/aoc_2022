"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
const groupBy = (iterable, keyFn) => {
    const map = new Map();
    for (const elem of iterable) {
        const key = keyFn(elem);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [elem]);
        }
        else {
            collection.push(elem);
        }
    }
    return map;
};
exports.groupBy = groupBy;
