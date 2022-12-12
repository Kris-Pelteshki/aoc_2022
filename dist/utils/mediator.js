"use strict";
class Emitter {
    constructor() {
        this.listeners = new Map();
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
    }
}
