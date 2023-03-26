"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class Queue {
    constructor(items) {
        this.first = null;
        this.last = null;
        this._length = 0;
        if (items) {
            items.forEach((item) => this.enqueue(item));
        }
    }
    get size() {
        return this._length;
    }
    enqueue(value) {
        const newNode = new QueueNode(value);
        if (this._length === 0 || !this.last) {
            this.first = newNode;
            this.last = newNode;
        }
        else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this._length++;
        return this;
    }
    dequeue() {
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
    peek() {
        return this.first ? this.first.value : null;
    }
    clear() {
        this.first = null;
        this.last = null;
        this._length = 0;
    }
}
exports.Queue = Queue;
