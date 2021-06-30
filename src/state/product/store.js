import { queryMachine } from '../commons/queryMachine';
import { onSuccessProductFetch, onSuccessProductsFetch } from './actions';

export const productsMachine = queryMachine.withConfig({
  actions: {
    onSuccessFetch: onSuccessProductsFetch
  }
});

export const productMachine = queryMachine.withConfig({
  actions: {
    onSuccessFetch: onSuccessProductFetch
  }
});
