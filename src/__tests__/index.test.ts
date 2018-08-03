import Weu from '../index';

describe('test watch', () => {
  test('watch a simple property', (done) => {
    const oldDataVal = 1;
    const newDataVal = 2;
    const vm: Weu = new Weu({
      data: {
        a: oldDataVal
      },
      watch: {
        a(newVal: any, oldVal: any) {
          expect(oldVal).toBe(oldDataVal);
          expect(newVal).toBe(newDataVal);
          done();
        }
      }
    });
    vm.a = newDataVal;
  });

  test('watch a nested property', (done) => {
    const oldDataVal = 1;
    const newDataVal = 2;
    const vm: Weu = new Weu({
      data: {
        a: {
          b: oldDataVal
        }
      },
      watch: {
        'a.b'(newVal: any, oldVal: any) {
          expect(oldVal).toBe(oldDataVal);
          expect(newVal).toBe(newDataVal);
          done();
        }
      }
    });
    vm.a.b = newDataVal;
  });
});

describe('test computed', () => {
  test('computed a simple property', () => {
    const vm: Weu = new Weu({
      data: {
        a: 1
      },
      computed: {
        b() {
          return this.a * 10;
        }
      }
    });
    expect(vm.b).toBe(vm.a * 10);
  });

  test('computed a nested property', () => {
    const vm: Weu = new Weu({
      data: {
        a: {
          b: 1
        }
      },
      computed: {
        c() {
          return this.a.b * 20;
        }
      }
    });
    expect(vm.c).toBe(vm.a.b * 20);
  });
});
