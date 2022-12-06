"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const processData = (data, sequenceLength = 14) => {
        const sequenceStartIndex = data
            .split("")
            .findIndex((_, i) => (0, utils_1.isUniqueSequenceOfElements)(data.slice(i, i + sequenceLength)));
        return sequenceStartIndex + sequenceLength;
    };
    const result = (0, utils_1.flow)(input_1.default).pipe(processData);
    console.log(result);
})();
