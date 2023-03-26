import { EventEmitter, Queue, splitByLine } from "../utils";
import input from "./input";

(function () {
  type MonkeyThrowEvent = {
    item: number;
    monkeyId: number;
  };
  type HandleMonkeyThrow = (event: MonkeyThrowEvent) => void;

  const monkeyEmitter = new EventEmitter<{
    throwToMonkey: MonkeyThrowEvent;
  }>();

  class Monkey {
    private id: number;
    private items: Queue<number>;
    private operation: (old: number) => number;
    private test: (newItem: number) => number;
    private throwToTrueId: number;
    private throwToFalseId: number;
    private _inspectCount = 0;
    options: { throw: HandleMonkeyThrow };

    constructor(textInput: string, options: { throw: HandleMonkeyThrow }) {
      const [
        name,
        startingItems,
        textOperation,
        textTest,
        throwTrue,
        throwFalse,
      ] = splitByLine(textInput);

      this.options = options;
      this.id = Number(name.slice("Monkey ".length, -1));

      const items = startingItems.split(": ")[1].split(", ").map(Number);
      this.items = new Queue(items);

      this.operation = Monkey.getOperation(textOperation);
      this.test = this.getTest(textTest);

      this.throwToTrueId = Monkey.getThrowId(throwTrue);
      this.throwToFalseId = Monkey.getThrowId(throwFalse);

      monkeyEmitter.on("throwToMonkey", this.onThrowToMonkey.bind(this));
    }

    private onThrowToMonkey({ item, monkeyId }: MonkeyThrowEvent) {
      if (monkeyId === this.id) {
        this.items.enqueue(item);
      }
    }

    private static getOperation(textOperation: string) {
      const operation = textOperation.split("= old ")[1];
      const [operator, value] = operation.split(" ");

      if (textOperation.includes("old * old")) {
        return (old: number) => old * old;
      }

      const operationFunction = Monkey.getOperationFunction(operator as any);

      return (old: number) => operationFunction(old, Number(value));
    }

    private static getOperationFunction(operator: "*" | "+" | "-") {
      const operations = {
        "*": (old: number, value: number) => old * value,
        "+": (old: number, value: number) => old + value,
        "-": (old: number, value: number) => old - value,
      } as const;

      return operations[operator];
    }

    private getTest(textTest: string) {
      const value = textTest.split("divisible by ")[1];

      return (item: number) =>
        item % Number(value) === 0 ? this.throwToTrueId : this.throwToFalseId;
    }

    private static getThrowId(textThrow: string) {
      return Number(textThrow.split("throw to monkey ")[1]);
    }

    private reduceWorryLevel(item: number): number {
      return Math.floor(item / 3);
    }

    private inspect() {
      const item = this.items.dequeue();
      if (item === null) {
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

    public inspectAll() {
      while (this.items.size > 0) {
        this.inspect();
      }
    }

    public get inspectCount() {
      return this._inspectCount;
    }
  }

  const splitByEmptyLine = (input: string) => input.split("\n\n");

  const run = (rounds = 20) => {
    const monkeys = splitByEmptyLine(input).map((monkeyInput) => {
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
