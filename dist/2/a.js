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
        X: Shapes.Rock,
        Y: Shapes.Paper,
        Z: Shapes.Scissors,
    };
    const player2WinningMap = {
        [`${Shapes.Rock}${Shapes.Paper}`]: true,
        [`${Shapes.Paper}${Shapes.Scissors}`]: true,
        [`${Shapes.Scissors}${Shapes.Rock}`]: true,
    };
    const isWin = ([first, second]) => {
        return Boolean(player2WinningMap[`${first}${second}`]);
    };
    const getResult = ([first, second]) => {
        if (first === second) {
            return ResultPoints.Draw + second;
        }
        if (isWin([first, second])) {
            return ResultPoints.Win + second;
        }
        return ResultPoints.Loss + second;
    };
    const rounds = input_1.input_2.split("\n").map((str) => {
        const [first, second] = str.split(" ");
        return [InputToShape[first], InputToShape[second]];
    });
    const result = (0, utils_1.sum)(rounds.map(getResult));
    console.log(result);
})();
