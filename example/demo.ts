import Weu from '../src/index';

const vm = new Weu({
  data: {
    a: 1
  },
  computed: {
    b() {
      return this.a + 1;
    }
  },
  watch: {
    a(newVal, oldVal) {
      console.log(`I am watched! I am changed from ${oldVal} to ${newVal}`);
    }
  }
});

console.log(vm.a);
console.log(vm.b);
vm.a = 2;
console.log(vm.a);
console.log(vm.b);
