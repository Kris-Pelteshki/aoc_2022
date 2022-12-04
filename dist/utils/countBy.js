"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countBy = void 0;
const countBy = (iterable, fn) => {
    const aggregate = new Map();
    for (const elem of iterable) {
        const mapKey = fn(elem);
        const count = aggregate.get(mapKey) || 0;
        aggregate.set(mapKey, count + 1);
    }
    return aggregate;
};
exports.countBy = countBy;
