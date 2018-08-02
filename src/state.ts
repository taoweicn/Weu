import { observe } from './observer';
import { Watcher } from './watcher';

export function initState(vm: any): void {
  const options = vm.$options;
  if (options.data) {
    initData(vm);
  }
  if (options.computed) {
    initComputed(vm);
  }
  if (options.watch) {
    initWatch(vm);
  }
}

function initData(vm: any): void {
  const data = vm._data = vm.$options.data;
  Object.keys(data).forEach((key) => {
    proxy(vm, '_data', key);
  });
  observe(data);
}

function initComputed(vm: any): void {
  const computed = vm.$options.computed;
  const watchers = vm._computedWatchers = Object.create(null);
  Object.keys(computed).forEach((key) => {
    const userDef = computed[key];
    watchers[key] = new Watcher(vm, key, userDef);
    if (!(key in vm)) {
      /* 直接定义一个新属性，所以不需要proxy函数代理即可直接在实例上访问 */
      Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: true,
        get: userDef,
        set() {
          console.warn('Computed property is read-only!');
        }
      });
    }
  });
}

function initWatch(vm: any): void {
  const watch = vm.$options.watch;
  Object.keys(watch).forEach((key) => {
    const cb = watch[key];
    const watcher = new Watcher(vm, key, cb);
  });
}

function proxy(target: object, sourceKey: string, key: string): void {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return this[sourceKey][key];
    },
    set(val) {
      this[sourceKey][key] = val;
    }
  });
}
