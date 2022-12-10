"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const parseInstruction = (instruction) => {
        return instruction.split(" ");
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
    const getNextInstructionCycle = (cycle, instructionType) => {
        return cycle + instructionsConfig[instructionType].cycles;
    };
    // y = 40x + 20
    const isCycleCheck = (cycle) => {
        return (cycle % 40) - 20 === 0;
    };
    const instructionGenerator = function* (instructions) {
        let instructionIdx = -1;
        while (true) {
            yield instructions[++instructionIdx];
        }
    };
    const onCycleCheck = (cycle, register) => {
        return cycle * register;
    };
    const executeInstructions = (instructions) => {
        const instructionIterator = instructionGenerator(instructions);
        let register = 1;
        let nextInstructionCycle = 0;
        let instructionType = "";
        let instructionValue = undefined;
        let signal = 0;
        for (let cycle = 0;; cycle++) {
            if (isCycleCheck(cycle)) {
                signal += onCycleCheck(cycle, register);
            }
            if (cycle === nextInstructionCycle) {
                if (hasEffect(instructionType)) {
                    register += Number(instructionValue);
                }
                const instruction = instructionIterator.next().value;
                if (instruction === undefined) {
                    break;
                }
                [instructionType, instructionValue] = parseInstruction(instruction);
                nextInstructionCycle = getNextInstructionCycle(cycle, instructionType);
            }
        }
        return signal;
    };
    const result = (0, utils_1.flow)(input_1.default).pipe(utils_1.splitByLine, executeInstructions);
    console.log(result);
})();
