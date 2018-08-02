import { Dep, popTarget, pushTarget } from './dep';

let uid = 0;

export class Watcher {
  public vm: any;
  public cb: () => void;
  public id: number;
  public depIds: object;
  public getter: any;
  public value: any;

  constructor(
    vm: any,
    expOrFn: any,
    cb: () => void
  ) {
    this.vm = vm;
    this.cb = cb;
    this.id = ++uid;
    this.depIds = {};
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }
    this.value = this.get();
  }

  public get() {
    pushTarget(this);
    const vm = this.vm;
    const value = this.getter.call(vm, vm);
    popTarget();
    return value;
  }

  public addDep(dep: Dep) {
    const id = dep.id;
    if (!this.depIds.hasOwnProperty(id)) {
      dep.addSub(this);
      this.depIds[id] = dep;
    }
  }

  public update() {
    this.run();
  }

  public run() {
    const value = this.get();
    const oldValue = this.value;
    if (value !== oldValue) {
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }
}

function parsePath(path: string): any {
  const bailRE = /[^\w.$]/;
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return (obj: object) => {
    for (const segment of segments) {
      if (!obj) {
        return;
      }
      obj = obj[segment]; // 获取vm实例上的值
    }
    return obj;
  };
}
