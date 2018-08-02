import Weu from '../src/index';

const vm: Weu = new Weu({
  data: {
    a: 1,
    c: {
      d: 'xxx'
    }
  },
  computed: {
    b() {
      return this.a * 10;
    }
  },
  watch: {
    a(newVal, oldVal) {
      console.log(`I am watched! I am changed from ${oldVal} to ${newVal}`);
    },
    ['c.d'](newVal, oldVal) {
      console.log(`I am watched! I am changed from ${oldVal} to ${newVal}`);
    }
  }
});

console.log('a: ', vm.a);
console.log('b: ', vm.b);
vm.a = 2;
console.log('a: ', vm.a);
console.log('b: ', vm.b);

vm.c.d = 'yyy';
console.log(vm.c.d);
