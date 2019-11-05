import { initState } from './state';

interface IData {
  [prop: string]: any
}
type DataMethod = () => IData;

interface IComputedProps {
  [prop: string]: () => any;
}

interface IOptions {
  data?: DataMethod;
  computed?: IComputedProps;
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
