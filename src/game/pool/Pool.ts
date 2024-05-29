export default class Pool<T extends new () => InstanceType<T> = new () => any> {
  public readonly ctor: T;

  public readonly list: InstanceType<T>[] = [];

  constructor(ctor: T) {
    this.ctor = ctor;
  }

  public get() {
    // eslint-disable-next-line new-cap
    return this.list.pop() ?? new this.ctor();
  }

  public giveBack(item: InstanceType<T>) {
    if (this.list.includes(item)) return;
    this.list.push(item);
  }
}
