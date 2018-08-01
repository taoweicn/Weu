import Weu from '../src/index';

const vm = new Weu({
  data: {
    a: 1
  },
  watch: {
    a(newVal, oldVal) {
      console.log(`I am watched! I am changed from ${oldVal} to ${newVal}`);
    }
  }
});

console.log(vm.a);
vm.a = 2;
console.log(vm.a);
