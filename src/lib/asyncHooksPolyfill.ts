/**
 * Browser-safe polyfill for Node.js `async_hooks`.
 *
 * `@openai/agents-core` imports AsyncLocalStorage for its internal tracing
 * context. The tracing feature is only meaningful server-side; the browser
 * shim (`shims-browser.mjs`) still imports from `async_hooks` at module load
 * time, which crashes the browser bundle.
 *
 * This module is aliased over `async_hooks` / `node:async_hooks` in webpack
 * (next.config.ts) for client-side builds only, providing a synchronous
 * no-op implementation so the rest of @openai/agents-realtime works normally.
 */

export class AsyncLocalStorage<T = unknown> {
  private _store: T | undefined;

  getStore(): T | undefined {
    return this._store;
  }

  run<R>(store: T, fn: (...args: unknown[]) => R, ...args: unknown[]): R {
    const prev = this._store;
    this._store = store;
    try {
      return fn(...args);
    } finally {
      this._store = prev;
    }
  }

  enterWith(store: T): void {
    this._store = store;
  }

  disable(): void {
    /* no-op */
  }

  /** Static helpers that agents-core calls on the class itself */
  static bind<F extends (...args: unknown[]) => unknown>(
    fn: F,
    _type?: string,
    thisArg?: unknown
  ): F {
    return (thisArg != null ? fn.bind(thisArg) : fn) as F;
  }

  static snapshot(): <R>(fn: () => R) => R {
    return (fn) => fn();
  }
}

export class AsyncResource {
  readonly type: string;

  constructor(type: string) {
    this.type = type;
  }

  static bind<F extends (...args: unknown[]) => unknown>(
    fn: F,
    _type?: string,
    thisArg?: unknown
  ): F {
    return (thisArg != null ? fn.bind(thisArg) : fn) as F;
  }

  bind<F extends (...args: unknown[]) => unknown>(fn: F, thisArg?: unknown): F {
    return (thisArg != null ? fn.bind(thisArg) : fn) as F;
  }

  runInAsyncScope<R>(
    fn: (...args: unknown[]) => R,
    thisArg?: unknown,
    ...args: unknown[]
  ): R {
    return fn.apply(thisArg, args);
  }

  emitDestroy(): this {
    return this;
  }
}

/** Named exports that agents-core may destructure */
export const createHook = () => ({
  enable: () => {},
  disable: () => {},
});

export const executionAsyncId = () => 0;
export const triggerAsyncId = () => 0;
