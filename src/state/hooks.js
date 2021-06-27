import * as React from 'react';
import { useMachine } from '@xstate/react';

export const useQuery = (query) => {
  const [state, send] = useMachine(query.machine);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  React.useEffect(() => {
    setLoading(state.matches('loading'));
    if (state.matches('success')) {
      setData(state.context.data);
    } else if (state.matches('failure')) {
      setErrors([state.context.error]);
    }
  }, [state]);

  React.useEffect(() => {
    send('FETCH', { query });
  }, []);

  return { data, loading, errors };
};

export const useMutation = (query) => {
  const [state, send] = useMachine(query.machine);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  const handleMutation = ({ variables }) => {
    send('FETCH', { query, variables });
  };

  React.useEffect(() => {
    setLoading(state.matches('loading'));
    if (state.matches('success')) {
      setData(state.context.data);
    } else if (state.matches('failure')) {
      setErrors([state.context.error]);
    }
  }, [state]);

  return [handleMutation, { data, loading, errors }];
};
