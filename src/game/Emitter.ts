import * as utils from '@pixi/utils';

const eventEmitter = new utils.EventEmitter();

interface EventManager {
  on(event: string, fn: (payload?: any) => void): void;
  once(event: string, fn: (payload?: any) => void): void;
  off(event: string, fn: (payload?: any) => void): void;
  emit(event: string, payload?: any): void;
}

const eventManager: EventManager = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};

export default Object.freeze(eventManager);
