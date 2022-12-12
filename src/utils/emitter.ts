type EventMap = Record<string, unknown>;
type EventReceiver<T extends unknown> = (arg: T) => void;

export class EventEmitter<T extends EventMap> {
  private listeners = new Map<keyof T, Function[]>();
  private anyListeners: Function[] = [];

  on<K extends keyof T>(eventName: K, fn: EventReceiver<T[K]>): void {
    const listeners = this.listeners.get(eventName) || [];
    listeners.push(fn);
    this.listeners.set(eventName, listeners);
  }

  off<K extends keyof T>(eventName: K, fn: EventReceiver<T[K]>): void {
    const listeners = this.listeners.get(eventName) || [];
    this.listeners.set(
      eventName,
      listeners.filter((l) => l !== fn)
    );
  }

  emit<K extends keyof T>(eventName: K, params: T[K]): void {
    const listeners = this.listeners.get(eventName) || [];
    listeners.forEach((fn) => fn(params));

    this.anyListeners.forEach((fn) => fn(eventName, params));
  }

  onAny(fn: (eventName: string, params: unknown) => void): void {
    this.anyListeners.push(fn);
  }
}
