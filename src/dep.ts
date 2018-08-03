import { Watcher } from './watcher';

let uid = 0;

export class Dep {
  public static target: Watcher | null | undefined;
  public id: number;
  public subs: Watcher[];

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  public addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  public depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  public notify() {
    this.subs.forEach((sub: Watcher): void => {
      sub.update();
    });
  }
}

Dep.target = null;
const targetStack: Watcher[] = [];

export function pushTarget(target: Watcher): void {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = target;
}

export function popTarget(): void {
  Dep.target = targetStack.pop();
}
