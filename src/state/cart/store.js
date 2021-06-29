import { mutationMachine } from '../commons/mutationMachine';
import { onFailedAddProductToCart, onSuccessAddProductToCart } from './actions';

export const cartMachine = mutationMachine.withConfig({
  actions: {
    onSuccessFetch: onSuccessAddProductToCart,
    onFailedFetch: onFailedAddProductToCart
  }
});
