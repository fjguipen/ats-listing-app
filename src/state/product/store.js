import { fetchMachine } from '../commons/fetchMachine';
import { handleFetch } from '../commons/handleFetch';
import { onError, onSucceeded, onTimeout } from './actions';

export const productsMachine = fetchMachine.withConfig({
  actions: {
    onSucceeded: onSucceeded,
    onError: onError,
    onTimeout: onTimeout
  },
  services: {
    fetchData: (ctx, e) => handleFetch(e.query)
  }
});
