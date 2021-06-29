import { createMachine, assign } from 'xstate';
import { handleFetch } from './handleFetch';

export const mutationMachine = createMachine(
  {
    id: 'fetch',
    initial: 'idle',
    states: {
      idle: {
        on: { FETCH: 'loading' }
      },
      loading: {
        invoke: {
          id: 'mutation',
          src: 'fetchData',
          onDone: {
            target: 'success',
            actions: 'onSuccessFetch'
          },
          onError: {
            target: 'failure',
            actions: 'onFailedFetch'
          }
        }
      },
      success: {
        entry: 'onSucceeded',
        always: {
          target: 'idle'
        }
      },
      failure: {
        entry: 'onError',
        always: {
          target: 'idle'
        }
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
