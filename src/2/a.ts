import { sum } from "../utils";
import input from "./input";

(function () {
  enum Shapes {
    Rock = 1,
    Paper,
    Scissors,
  }

  enum ResultPoints {
    Loss = 0,
    Draw = 3,
    Win = 6,
  }

  type Inputs = "A" | "B" | "C" | "X" | "Y" | "Z";
  type RoundInput = readonly [Shapes, Shapes];

  const InputToShape: Record<Inputs, Shapes> = {
    A: Shapes.Rock,
    B: Shapes.Paper,
    C: Shapes.Scissors,
    X: Shapes.Rock,
    Y: Shapes.Paper,
    Z: Shapes.Scissors,
  } as const;

  const player2WinningMap = {
    [`${Shapes.Rock}${Shapes.Paper}`]: true,
    [`${Shapes.Paper}${Shapes.Scissors}`]: true,
    [`${Shapes.Scissors}${Shapes.Rock}`]: true,
  };

  const isWin = ([first, second]: RoundInput): boolean => {
    return Boolean(player2WinningMap[`${first}${second}`]);
  };

  const getResult = ([first, second]: RoundInput): number => {
    if (first === second) {
      return ResultPoints.Draw + second;
    }

    if (isWin([first, second])) {
      return ResultPoints.Win + second;
    }

    return ResultPoints.Loss + second;
  };

  const rounds = input.split("\n").map((str: string): RoundInput => {
    const [first, second] = str.split(" ") as [Inputs, Inputs];

    return [InputToShape[first], InputToShape[second]];
  });

  const result = sum(rounds.map(getResult));
  console.log(result);
})();
