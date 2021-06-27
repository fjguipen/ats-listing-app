import * as React from 'react';
import { useMachine } from '@xstate/react';

const parsePath = (path, variables) => {
  let parsed = path;
  if (!variables) {
    return parsed;
  }
  Object.keys(variables).forEach((key) => {
    parsed = parsed.replace(/{{(.)+}}/, variables[key]);
  });

  return parsed;
};

export const useQuery = (query, { variables } = {}) => {
  const [state, send] = useMachine(query.machine);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  React.useEffect(() => {
    setLoading(state.matches('loading'));
    if (state.matches('success')) {
      setData(state.context);
    } else if (state.matches('failure')) {
      setErrors([state.context.error]);
    }
  }, [state]);

  React.useEffect(() => {
    send('FETCH', {
      query: {
        ...query,
        path: parsePath(query.path, variables)
      }
    });
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
      setData(state.context);
    } else if (state.matches('failure')) {
      setErrors([state.context.error]);
    }
  }, [state]);

  return [handleMutation, { data, loading, errors }];
};
