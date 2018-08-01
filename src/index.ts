import { observe } from './observer';
import { Watcher } from './watcher';

interface IOptions {
  data?: any;
  computed?: any;
  watch?: any;
}

function Weu(options: IOptions = {}) {
  this.$options = options;
  if (options.data) {
    initData(this);
  }
  if (options.computed) {
    initComputed(this, options.computed);
  }
  if (options.watch) {
    initWatch(this, options.watch);
  }
}

function initData(vm: any): void {
  const data = vm._data = vm.$options.data;
  Object.keys(data).forEach((key) => {
    proxy(vm, '_data', key);
  });
  observe(data);
}

function initComputed(vm: any, computed: object): void {
  // todo
}

function initWatch(vm: any, watch: object): void {
  Object.keys(watch).forEach((key) => {
    const cb = watch[key];
    const watcher = new Watcher(vm, key, cb);
  });
}

function proxy(target: object, sourceKey: string, key: string) {
  const property = {
    configurable: true,
    enumerable: true,
    get() {
      return this[sourceKey][key];
    },
    set(val) {
      this[sourceKey][key] = val;
    }
  };
  Object.defineProperty(target, key, property);
}

export default Weu;
