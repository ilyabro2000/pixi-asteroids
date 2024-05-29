import Pool from '@/game/pool/Pool';

class MultiPool {
  public readonly map: Map<new () => any, Pool> = new Map();

  public get<T extends new() => InstanceType<T>>(ctor: T): InstanceType<T> {
    let pool = this.map.get(ctor);
    if (!pool) {
      pool = new Pool(ctor);
      this.map.set(ctor, pool);
    }
    return pool.get();
  }

  public giveBack(item: InstanceType<any>) {
    const pool = this.map.get(item.constructor);
    if (pool) pool.giveBack(item);
  }
}

export const pool = new MultiPool();
