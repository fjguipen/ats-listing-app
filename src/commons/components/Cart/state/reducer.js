import { addItem } from './actions';
import { DEFAULT_CONTEXT } from './context';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return addItem(state, action.payload);
    case 'clear':
      return DEFAULT_CONTEXT;
    default:
      break;
  }
};
