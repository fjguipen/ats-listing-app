import { fetchMachine } from '../commons/fetchMachine';
import { onSuccessProductFetch, onSuccessProductsFetch } from './actions';

export const productsMachine = fetchMachine.withConfig({
  actions: {
    onSuccessFetch: onSuccessProductsFetch
  }
});

export const productMachine = fetchMachine.withConfig({
  actions: {
    onSuccessFetch: onSuccessProductFetch
  }
});
