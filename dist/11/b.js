"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const monkeyEmitter = new utils_1.EventEmitter();
    class Monkey {
        constructor(textInput, options) {
            this._inspectCount = 0;
            const [name, startingItems, textOperation, textTest, throwTrue, throwFalse,] = (0, utils_1.splitByLine)(textInput);
            this.options = options;
            this.id = Number(name.slice("Monkey ".length, -1));
            this.divisor = Number(textTest.split("divisible by ")[1]);
            const items = startingItems.split(": ")[1].split(", ").map(Number);
            this.items = new utils_1.Queue(items);
            this.operation = Monkey.parseData(textOperation);
            this.throwToTrueId = Monkey.getThrowId(throwTrue);
            this.throwToFalseId = Monkey.getThrowId(throwFalse);
            monkeyEmitter.on("throwToMonkey", this.onThrowToMonkey.bind(this));
        }
        onThrowToMonkey({ item, monkeyId }) {
            if (monkeyId === this.id) {
                this.items.enqueue(item);
            }
        }
        static parseData(textOperation) {
            const [operator, value] = textOperation.split("= old ")[1].split(" ");
            const numValue = Number(value);
            const type = (value === "old" ? "^2" : operator);
            switch (type) {
                case "*": {
                    return (item) => (item * numValue) % 9699690;
                }
                case "^2": {
                    return (item) => (item * item) % 9699690;
                }
                default:
                    return (item) => item + numValue;
            }
        }
        test(item) {
            return item % this.divisor === 0
                ? this.throwToTrueId
                : this.throwToFalseId;
        }
        static getThrowId(textThrow) {
            return Number(textThrow.split("throw to monkey ")[1]);
        }
        inspect() {
            const item = this.items.dequeue();
            if (item === null) {
                return;
            }
            const newItem = this.operation(item);
            const throwToId = this.test(newItem);
            this.options.throw({
                item: newItem,
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
            .slice(0, 2);
        console.log((0, utils_1.product)(result));
    };
    run(10000);
})();
