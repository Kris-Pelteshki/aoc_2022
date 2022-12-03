"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = require("./input");
(function () {
    const ACharCode = "a".charCodeAt(0);
    const ACapitalCaseCharCode = "A".charCodeAt(0);
    const isLowerCase = (letter) => letter.toLowerCase() === letter;
    const letterToNumber = (letter) => {
        const decrement = isLowerCase(letter)
            ? ACharCode
            : ACapitalCaseCharCode - 26;
        return 1 + letter.charCodeAt(0) - decrement;
    };
    const matchInGroup = (group) => {
        const [first, ...rest] = group;
        return ((0, utils_1.splitByCharacter)(first).find((letter) => rest.every((elf) => elf.includes(letter))) || "");
    };
    const result = (0, utils_1.flow)(input_1.input_3).pipe(utils_1.splitByLine, (lines) => (0, utils_1.chunks)(lines, 3), (groups) => groups.map(matchInGroup).map(letterToNumber), utils_1.sum);
    console.log(result);
})();
