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

  type Inputs = "A" | "B" | "C";
  type ExpectedOutcome = "X" | "Y" | "Z";
  type RoundInput = readonly [Shapes, ResultPoints];

  const InputToShape: Record<Inputs, Shapes> = {
    A: Shapes.Rock,
    B: Shapes.Paper,
    C: Shapes.Scissors,
  } as const;

  const InputToResult: Record<ExpectedOutcome, ResultPoints> = {
    X: ResultPoints.Loss,
    Y: ResultPoints.Draw,
    Z: ResultPoints.Win,
  } as const;

  const getShapePoints = ([shape, outcome]: RoundInput): number => {
    if (outcome === ResultPoints.Draw) {
      return shape;
    }

    switch (`${shape}${outcome}`) {
      case `${Shapes.Paper}${ResultPoints.Loss}`:
      case `${Shapes.Scissors}${ResultPoints.Win}`:
        return Shapes.Rock;
      case `${Shapes.Scissors}${ResultPoints.Loss}`:
      case `${Shapes.Rock}${ResultPoints.Win}`:
        return Shapes.Paper;
      case `${Shapes.Rock}${ResultPoints.Loss}`:
      case `${Shapes.Paper}${ResultPoints.Win}`:
        return Shapes.Scissors;

      default:
        return Shapes.Scissors;
    }
  };

  const rounds = input.split("\n").map((str: string): RoundInput => {
    const [first, second] = str.split(" ") as [Inputs, ExpectedOutcome];

    return [InputToShape[first], InputToResult[second]];
  });

  const result = sum(
    rounds.map(([first, second]) => {
      return getShapePoints([first, second]) + second;
    })
  );
  console.log(result);
})();
