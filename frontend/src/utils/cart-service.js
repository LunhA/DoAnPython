import { STORAGE_KEY } from '@/consts/commons';
import { commonStorage } from './storage-service';

export const cartService = {
  getPaymentInfo() {
    const payment = commonStorage.getItem(STORAGE_KEY.PAYMENT);
    return payment;
  },
  addPaymentInfo(item) {
    commonStorage.setItem(STORAGE_KEY.PAYMENT, item);
  },
  getCartItems() {
    const cartItems = commonStorage.getItem(STORAGE_KEY.CART_ITEMS);

    if (!cartItems) {
      return [];
    }

    return cartItems;
  },
  addCartItem(item) {
    const cartItems = commonStorage.getItem(STORAGE_KEY.CART_ITEMS);

    if (cartItems) {
      cartItems.push({ ...item, cartItemId: new Date().getTime() });
      commonStorage.setItem(STORAGE_KEY.CART_ITEMS, cartItems);
    } else {
      const newCart = [item];
      commonStorage.setItem(STORAGE_KEY.CART_ITEMS, newCart);
    }
  },
  removeCartItem(item) {
    const cartItems = commonStorage.getItem(STORAGE_KEY.CART_ITEMS);

    if (cartItems) {
      const newCart = cartItems.filter(
        (itemInCart) => itemInCart.cartItemId !== item.cartItemId
      );
      commonStorage.setItem(STORAGE_KEY.CART_ITEMS, newCart);
    }
  },
  clearCart() {
    commonStorage.removeItem(STORAGE_KEY.CART_ITEMS);
  },
};