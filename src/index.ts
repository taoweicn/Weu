import { initState } from './state';

interface IOptions {
  data?: any;
  computed?: any;
  watch?: any;
}

class Weu {
  public $options: IOptions;
  [propName: string]: any

  constructor(options: IOptions) {
    this.$options = options;
    initState(this);
  }
}

export default Weu;
