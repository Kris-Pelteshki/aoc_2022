"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitByCharacter = exports.splitByLine = exports.splitBySpace = void 0;
const splitBy = (seperator) => (str) => str.split(seperator);
exports.splitBySpace = splitBy(" ");
exports.splitByLine = splitBy("\n");
exports.splitByCharacter = splitBy("");
