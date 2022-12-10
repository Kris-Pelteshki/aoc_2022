export class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek(): T {
    return this.items[this.items.length - 1];
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }
}
