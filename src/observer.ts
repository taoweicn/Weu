import { Dep } from './dep';

export class Observer {
  public value: any;
  public dep: Dep;

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep();
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,
      configurable: true,
      writable: true
    });
    this.walk(value);
  }

  public walk(obj: object) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key);
    });
  }
}

export function defineReactive(obj: object, key: string) {
  const dep = new Dep();
  let val = obj[key];
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(newVal) {
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return;
      }
      val = newVal;
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

export function observe(value: any): Observer {
  if (typeof value !== 'object' || value === null) {
    return;
  }
  if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
    return value.__ob__;
  } else {
    return new Observer(value);
  }
}
