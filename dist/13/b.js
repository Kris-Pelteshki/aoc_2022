"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const extraPackets = ["[[2]]", "[[6]]"];
    const parseInput = (input) => {
        const lines = (0, utils_1.splitByLine)(input);
        const filteredLines = lines.filter((line) => line !== "");
        filteredLines.push(...extraPackets);
        return filteredLines.map((line) => JSON.parse(line));
    };
    const compare = (a, b) => {
        if (typeof a === "number" && typeof b === "number") {
            if (a === b) {
                return 0;
            }
            return a < b ? 1 : -1;
        }
        if (typeof a === "undefined") {
            return 1;
        }
        if (typeof b === "undefined") {
            return -1;
        }
        if (Array.isArray(a) && typeof b === "number") {
            return compare(a, [b]);
        }
        if (typeof a === "number" && Array.isArray(b)) {
            return compare([a], b);
        }
        if (Array.isArray(a) && Array.isArray(b)) {
            const end = Math.max(a.length, b.length);
            for (let i = 0; i < end; i++) {
                const result = compare(a[i], b[i]);
                if (result !== 0)
                    return result;
            }
        }
        return 0;
    };
    const getIndiciesOfExtraPackets = (sortedPackets) => {
        const indicies = [];
        const stringPackets = sortedPackets.map((p) => JSON.stringify(p));
        extraPackets.forEach((packet) => {
            const index = stringPackets.indexOf(packet);
            indicies.push(index + 1);
        });
        return indicies;
    };
    console.log((0, utils_1.flow)(input_1.default).pipe((i) => parseInput(i)
        .sort((a, b) => compare(a, b))
        .reverse(), getIndiciesOfExtraPackets, utils_1.product));
})();
