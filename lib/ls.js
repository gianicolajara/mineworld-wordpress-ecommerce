export const getItem = (key = "") => {
  if (!window.localStorage) {
    return null;
  }
  return window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : null;
};

export const setItem = (key = "", value = []) => {
  if (!window.localStorage) {
    return null;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const deleteItem = (key = "") => {
  if (!window.localStorage) {
    return null;
  }
  window.localStorage.removeItem(key);
};

export const updateItem = (key = "", value = {}) => {
  const items = getItem(key);

  const findItem = items?.find((item) => item.id === value.id);

  const newItem = findItem
    ? items.map((item) =>
        item.id === findItem.id
          ? { ...item, quantity: item.quantity + value.quantity }
          : item
      )
    : items
    ? [...items, value]
    : [value];

  if (newItem) {
    setItem(key, newItem);
  }
};

export const updateCartLs = (key = "", value = {}) => {
  const items = getItem(key);

  const findItemFromCart = items?.cart?.find((item) => item.id === value.id);

  const newCart = {
    cart:
      items?.cart.length > 0
        ? findItemFromCart
          ? items?.cart?.map((item) =>
              item.id === value.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...items?.cart, value]
        : [value],
  };

  if (newCart) {
    setItem(key, newCart);
  }
};

export const updateQuantityCartLs = (key = " ", value = {}) => {
  const item = getItem(key);

  const findItemFromCart = item?.cart?.find((item) => item.id === value.id);

  const newCart = {
    cart: item?.cart?.map((item) =>
      item.id === findItemFromCart.id
        ? { ...item, quantity: value.quantity === 0 ? 1 : value.quantity }
        : item
    ),
  };

  if (newCart) {
    setItem(key, newCart);
  }
};

export const deleteItemUpdate = (key = "", id = "") => {
  const newItem = getItem(key)?.filter((item) => item.id !== id);

  if (newItem) setItem(key, newItem);
};

export const deleteItemFromCart = (key = "", id = "") => {
  const newItem = getItem(key)?.cart?.filter((item) => item.id !== id);

  const newCart = {
    cart: newItem,
  };

  if (newItem) setItem(key, newCart);
};
