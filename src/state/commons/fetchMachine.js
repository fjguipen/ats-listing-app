import { createMachine, assign } from 'xstate';

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
            actions: assign({
              data: (_, event) => event.data
            })
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
      onSucceeded: [],
      onError: []
    },
    services: {
      fetchData: []
    }
  }
);
