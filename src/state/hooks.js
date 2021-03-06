import * as React from 'react';
import { useMachine } from '@xstate/react';
import { parsePath } from '../utils';

export const useQuery = (query, { variables } = {}) => {
  const [state, send] = useMachine(query.machine);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  React.useEffect(() => {
    send('FETCH', {
      query: {
        ...query,
        path: parsePath(query.path, variables)
      }
    });
  }, []);

  React.useEffect(() => {
    setLoading(state.matches('loading'));
    if (state.matches('failure')) {
      setErrors([state.context.error]);
    }
  }, [state]);

  return { data: state.context, loading, errors };
};

export const useMutation = (query) => {
  const [state, send, service] = useMachine(query.machine);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  const handleMutation = async ({ variables }) => {
    send('FETCH', { query, variables });
    let listenerHandler;
    const data = await new Promise((resolve, reject) => {
      listenerHandler = ({ context, event }) => {
        if (event.type === 'done.invoke.mutation') {
          resolve(context.data);
        } else if (event.type === 'error.platform.mutation') {
          reject(event.data);
        }
      };
      service.onTransition(listenerHandler);
    });
    service.off(listenerHandler);
    return data;
  };

  React.useEffect(() => {
    setLoading(state.matches('loading'));
    if (state.matches('success')) {
      setData(state.context);
    } else if (state.matches('failure')) {
      setErrors([state.context.error]);
    }
  }, [state]);

  return [handleMutation, { data, loading, errors }];
};
