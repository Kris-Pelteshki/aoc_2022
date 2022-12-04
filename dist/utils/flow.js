"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flow = void 0;
const flow = (input) => {
    return {
        pipe(...funcs) {
            return funcs.reduce((result, fn) => fn(result), input);
        },
    };
};
exports.flow = flow;
