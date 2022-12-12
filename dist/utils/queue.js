"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor(items) {
        this.items = [];
        this.head = 0;
        this.tail = 0;
        if (Array.isArray(items)) {
            this.items = items;
            this.tail = items.length;
        }
    }
    enqueue(item) {
        this.items[this.tail++] = item;
    }
    dequeue() {
        if (this.head === this.tail) {
            return undefined;
        }
        const item = this.items[this.head];
        delete this.items[this.head++];
        return item;
    }
    peek() {
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
exports.Queue = Queue;
