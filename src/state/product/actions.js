import { assign } from 'xstate';

export const onSuccessProductsFetch = assign({
  products: (ctx, event) => event.data
});

export const onSuccessProductFetch = assign({
  product: (ctx, event) => event.data
});
