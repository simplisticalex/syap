export const cartMiddleware = store => next => action => {
  const result = next(action);

  if (action.type.startsWith("cart/")) {
    const cartItems = store.getState().cart.items;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  return result;
};
