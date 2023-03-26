import { EventEmitter, product, Queue, splitByLine } from "../utils";
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
    private operation: (item: number) => number;
    private divisor: number;
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
      this.divisor = Number(textTest.split("divisible by ")[1]);

      const items = startingItems.split(": ")[1].split(", ").map(Number);
      this.items = new Queue(items);

      this.operation = Monkey.parseData(textOperation);
      this.throwToTrueId = Monkey.getThrowId(throwTrue);
      this.throwToFalseId = Monkey.getThrowId(throwFalse);

      monkeyEmitter.on("throwToMonkey", this.onThrowToMonkey.bind(this));
    }

    private onThrowToMonkey({ item, monkeyId }: MonkeyThrowEvent) {
      if (monkeyId === this.id) {
        this.items.enqueue(item);
      }
    }

    private static parseData(textOperation: string): (item: number) => number {
      const [operator, value] = textOperation.split("= old ")[1].split(" ");
      const numValue = Number(value);

      const type = (value === "old" ? "^2" : operator) as "*" | "+" | "^2";

      switch (type) {
        case "*": {
          return (item: number) => (item * numValue) % 9_699_690;
        }
        case "^2": {
          return (item: number) => (item * item) % 9_699_690;
        }

        default:
          return (item: number) => item + numValue;
      }
    }

    private test(item: number) {
      return item % this.divisor === 0
        ? this.throwToTrueId
        : this.throwToFalseId;
    }

    private static getThrowId(textThrow: string) {
      return Number(textThrow.split("throw to monkey ")[1]);
    }

    private inspect() {
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
      .slice(0, 2);

    console.log(product(result));
  };

  run(10_000);
})();
