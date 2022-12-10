import { flow, splitByLine } from "../utils";
import input from "./input";

(function () {
  type InstructionType = "noop" | "addx";
  type Register = number;

  const parseInstruction = (instruction: string) => {
    return instruction.split(" ") as [InstructionType, string | undefined];
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
    cycle: number,
    instructionType: InstructionType
  ) => {
    return cycle + instructionsConfig[instructionType].cycles;
  };

  // y = 40x + 20
  const isCycleCheck = (cycle: number) => {
    return (cycle % 40) - 20 === 0;
  };

  const instructionGenerator = function* (instructions: string[]) {
    let instructionIdx = -1;
    while (true) {
      yield instructions[++instructionIdx];
    }
  };

  const onCycleCheck = (cycle: number, register: Register) => {
    return cycle * register;
  };

  const executeInstructions = (instructions: string[]) => {
    const instructionIterator = instructionGenerator(instructions);
    let register = 1;
    let nextInstructionCycle = 0;
    let instructionType = "" as InstructionType;
    let instructionValue = undefined as string | undefined;
    let signal = 0;

    for (let cycle = 0; ; cycle++) {
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

  const result = flow(input).pipe(splitByLine, executeInstructions);

  console.log(result);
})();
