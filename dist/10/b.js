"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const rowLength = 40;
    const parseInstruction = (instruction) => {
        return instruction?.split(" ");
    };
    const instructionsConfig = {
        noop: {
            cycles: 1,
            hasEffect: false,
        },
        addx: {
            cycles: 2,
            hasEffect: true,
        },
    };
    const hasEffect = (instructionType) => {
        return instructionsConfig[instructionType]?.hasEffect;
    };
    const getNextInstructionCycle = (instructionType, cycle) => {
        return cycle + instructionsConfig[instructionType].cycles;
    };
    const isCycleCheck = (cycle) => cycle % rowLength === 0;
    const isIntersectingSprite = (register, cycle) => {
        const offset = 1;
        const spriteStart = register - offset;
        const spriteEnd = register + offset;
        const positionInRow = cycle % rowLength;
        return positionInRow >= spriteStart && positionInRow <= spriteEnd;
    };
    const instructionGenerator = function* (instructions) {
        let instructionIdx = -1;
        while (true) {
            const value = instructions[++instructionIdx];
            if (value === undefined) {
                break;
            }
            yield value;
        }
    };
    const executeInstructions = (instructions) => {
        const instructionIterator = instructionGenerator(instructions);
        let register = 1;
        let nextInstructionCycle = 0;
        let instructionType = "";
        let instructionValue = undefined;
        let ouptut = "";
        for (let cycle = 0;; cycle++) {
            if (cycle === nextInstructionCycle) {
                const { value, done } = instructionIterator.next();
                if (done) {
                    break;
                }
                if (hasEffect(instructionType)) {
                    register += Number(instructionValue);
                }
                [instructionType, instructionValue] = parseInstruction(value);
                nextInstructionCycle = getNextInstructionCycle(instructionType, cycle);
            }
            if (isCycleCheck(cycle)) {
                ouptut += "\n";
            }
            ouptut += isIntersectingSprite(register, cycle) ? "#" : ".";
        }
        return ouptut;
    };
    const result = (0, utils_1.flow)(input_1.default).pipe(utils_1.splitByLine, executeInstructions);
    console.log(result);
})();
