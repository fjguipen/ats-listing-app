import { assign } from 'xstate';

export const onSuccessAddProductToCart = assign({
  data: (ctx, event) => {
    return event.data;
  },
  error: null
});

export const onFailedAddProductToCart = assign({
  data: null,
  error: (ctx, event) => {
    return event.data;
  }
});
