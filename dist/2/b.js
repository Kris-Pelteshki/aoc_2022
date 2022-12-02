"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = require("./input");
(function () {
    let Shapes;
    (function (Shapes) {
        Shapes[Shapes["Rock"] = 1] = "Rock";
        Shapes[Shapes["Paper"] = 2] = "Paper";
        Shapes[Shapes["Scissors"] = 3] = "Scissors";
    })(Shapes || (Shapes = {}));
    let ResultPoints;
    (function (ResultPoints) {
        ResultPoints[ResultPoints["Loss"] = 0] = "Loss";
        ResultPoints[ResultPoints["Draw"] = 3] = "Draw";
        ResultPoints[ResultPoints["Win"] = 6] = "Win";
    })(ResultPoints || (ResultPoints = {}));
    const InputToShape = {
        A: Shapes.Rock,
        B: Shapes.Paper,
        C: Shapes.Scissors,
    };
    const InputToResult = {
        X: ResultPoints.Loss,
        Y: ResultPoints.Draw,
        Z: ResultPoints.Win,
    };
    const getShapePoints = ([shape, outcome]) => {
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
    const rounds = input_1.input_2.split("\n").map((str) => {
        const [first, second] = str.split(" ");
        return [InputToShape[first], InputToResult[second]];
    });
    const result = (0, utils_1.sum)(rounds.map(([first, second]) => {
        return getShapePoints([first, second]) + second;
    }));
    console.log(result);
})();
