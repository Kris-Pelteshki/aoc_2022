class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Queue<T> {
  private first: QueueNode<T> | null;
  private last: QueueNode<T> | null;
  private _length: number;

  constructor(items?: T[]) {
    this.first = null;
    this.last = null;
    this._length = 0;

    if (items) {
      items.forEach((item) => this.enqueue(item));
    }
  }

  get size(): number {
    return this._length;
  }

  enqueue(value: T): Queue<T> {
    const newNode = new QueueNode(value);

    if (this._length === 0 || !this.last) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this._length++;
    return this;
  }

  dequeue(): T | null {
    if (!this.first) {
      return null;
    }

    const returnVal = this.first.value;

    if (this.first === this.last) {
      this.clear();
      return returnVal;
    }

    this.first = this.first.next;
    this._length--;
    return returnVal;
  }

  peek(): T | null {
    return this.first ? this.first.value : null;
  }

  clear(): void {
    this.first = null;
    this.last = null;
    this._length = 0;
  }
}
