export class Queue<T> {
  private items: T[] = [];
  private head = 0;
  private tail = 0;

  constructor(items?: T[]) {
    if (Array.isArray(items)) {
      this.items = items;
      this.tail = items.length;
    }
  }

  /**
   * Adds an item to the end of the queue
   */
  enqueue(item: T) {
    this.items[this.tail++] = item;
  }

  /**
   * @returns {T} Returns the item at the front of the queue
   */
  dequeue(): T {
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }

  peek(): T | undefined {
    if (this.head === this.tail) {
      return undefined;
    }

    return this.items[this.head];
  }

  clear() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  get size() {
    return this.tail - this.head;
  }
}
