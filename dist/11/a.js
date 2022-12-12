"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const monkeyEmitter = new utils_1.EventEmitter();
    // monkeyEmitter.onAny((eventName, params) => {
    //   console.log(eventName, params);
    // });
    class Monkey {
        constructor(textInput, options) {
            this._inspectCount = 0;
            const [name, startingItems, textOperation, textTest, throwTrue, throwFalse,] = (0, utils_1.splitByLine)(textInput);
            this.options = options;
            this.id = Number(name.slice("Monkey ".length, -1));
            const items = startingItems.split(": ")[1].split(", ").map(Number);
            this.items = new utils_1.Queue(items);
            this.operation = Monkey.getOperation(textOperation);
            this.test = this.getTest(textTest);
            this.throwToTrueId = Monkey.getThrowId(throwTrue);
            this.throwToFalseId = Monkey.getThrowId(throwFalse);
            monkeyEmitter.on("throwToMonkey", this.onThrowToMonkey.bind(this));
        }
        onThrowToMonkey({ item, monkeyId }) {
            if (monkeyId === this.id) {
                this.items.enqueue(item);
            }
        }
        static getOperation(textOperation) {
            const operation = textOperation.split("= old ")[1];
            const [operator, value] = operation.split(" ");
            if (textOperation.includes("old * old")) {
                return (old) => old * old;
            }
            const operationFunction = Monkey.getOperationFunction(operator);
            return (old) => operationFunction(old, Number(value));
        }
        static getOperationFunction(operator) {
            const operations = {
                "*": (old, value) => old * value,
                "+": (old, value) => old + value,
                "-": (old, value) => old - value,
            };
            return operations[operator];
        }
        getTest(textTest) {
            const value = textTest.split("divisible by ")[1];
            return (item) => item % Number(value) === 0 ? this.throwToTrueId : this.throwToFalseId;
        }
        static getThrowId(textThrow) {
            return Number(textThrow.split("throw to monkey ")[1]);
        }
        reduceWorryLevel(item) {
            return Math.floor(item / 3);
        }
        inspect() {
            const item = this.items.dequeue();
            if (item === undefined) {
                return;
            }
            const newItem = this.operation(item);
            const worryLevel = this.reduceWorryLevel(newItem);
            const throwToId = this.test(worryLevel);
            this.options.throw({
                item: worryLevel,
                monkeyId: throwToId,
            });
            this._inspectCount++;
        }
        inspectAll() {
            while (this.items.size > 0) {
                this.inspect();
            }
        }
        get inspectCount() {
            return this._inspectCount;
        }
    }
    const splitByEmptyLine = (input) => input.split("\n\n");
    const run = (rounds = 20) => {
        const monkeys = splitByEmptyLine(input_1.default).map((monkeyInput) => {
            return new Monkey(monkeyInput, {
                throw: (event) => monkeyEmitter.emit("throwToMonkey", event),
            });
        });
        for (let i = 0; i < rounds; i++) {
            monkeys.forEach((monkey) => monkey.inspectAll());
        }
        const result = monkeys
            .map((monkey) => monkey.inspectCount)
            .sort((a, b) => b - a)
            .slice(0, 2)
            .reduce((product, val) => {
            return product * val;
        }, 1);
        console.log(result);
    };
    run();
})();
