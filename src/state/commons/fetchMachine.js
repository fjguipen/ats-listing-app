import { createMachine, assign } from 'xstate';
import { handleFetch } from './handleFetch';

export const fetchMachine = createMachine(
  {
    id: 'fetch',
    initial: 'idle',
    states: {
      idle: {
        on: { FETCH: 'loading' }
      },
      loading: {
        invoke: {
          src: 'fetchData',
          onDone: {
            target: 'success',
            actions: 'onSuccessFetch'
          },
          onError: {
            target: 'failure',
            actions: assign({
              error: (_, event) => event.data
            })
          }
        }
      },
      success: {
        type: 'final',
        entry: 'onSucceeded'
      },
      failure: {
        type: 'final',
        entry: 'onError'
      }
    }
  },
  // override on implementation
  {
    actions: {
      onSucceeded: () => {},
      onError: () => {}
    },
    services: {
      fetchData: (ctx, e) => handleFetch(e.query, e.variables)
    }
  }
);
