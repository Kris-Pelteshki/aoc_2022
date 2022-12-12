"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.listeners = new Map();
        this.anyListeners = [];
    }
    on(eventName, fn) {
        const listeners = this.listeners.get(eventName) || [];
        listeners.push(fn);
        this.listeners.set(eventName, listeners);
    }
    off(eventName, fn) {
        const listeners = this.listeners.get(eventName) || [];
        this.listeners.set(eventName, listeners.filter((l) => l !== fn));
    }
    emit(eventName, params) {
        const listeners = this.listeners.get(eventName) || [];
        listeners.forEach((fn) => fn(params));
        this.anyListeners.forEach((fn) => fn(eventName, params));
    }
    onAny(fn) {
        this.anyListeners.push(fn);
    }
}
exports.EventEmitter = EventEmitter;
