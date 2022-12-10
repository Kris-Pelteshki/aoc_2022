import { flow, splitByLine } from "../utils";
import input from "./input";

(function () {
  type InstructionType = "noop" | "addx";
  type Register = number;

  const rowLength = 40;

  const parseInstruction = (instruction: string) => {
    return instruction?.split(" ") as [InstructionType, string | undefined];
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
  } as const;

  const hasEffect = (instructionType: InstructionType) => {
    return instructionsConfig[instructionType]?.hasEffect;
  };

  const getNextInstructionCycle = (
    instructionType: InstructionType,
    cycle: number
  ) => {
    return cycle + instructionsConfig[instructionType].cycles;
  };

  const isCycleCheck = (cycle: number) => cycle % rowLength === 0;

  const isIntersectingSprite = (register: Register, cycle: number) => {
    const offset = 1;
    const spriteStart = register - offset;
    const spriteEnd = register + offset;

    const positionInRow = cycle % rowLength;

    return positionInRow >= spriteStart && positionInRow <= spriteEnd;
  };

  const instructionGenerator = function* (instructions: string[]) {
    let instructionIdx = -1;
    while (true) {
      const value = instructions[++instructionIdx];

      if (value === undefined) {
        break;
      }
      yield value;
    }
  };

  const executeInstructions = (instructions: string[]) => {
    const instructionIterator = instructionGenerator(instructions);
    let register = 1;
    let nextInstructionCycle = 0;
    let instructionType = "" as InstructionType;
    let instructionValue = undefined as string | undefined;
    let ouptut = "";

    for (let cycle = 0; ; cycle++) {
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

  const result = flow(input).pipe(splitByLine, executeInstructions);

  console.log(result);
})();
