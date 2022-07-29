import { ACTIONSCART } from "../actions/cart.actions";
import { initialCartState } from "../config/initialsConfig";

/*
  {
    cart: [...],
    subtotal: "$0.00"
    subtotalTax: "$0.00"
    total: "$0.00"
    totalTax: "$0.00"
  }
*/

const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONSCART.ADD_TO_CART:
      const findProduct = state?.cart?.find(
        (item) => item.id === action.payload.id
      );

      if (findProduct || findProduct !== undefined) {
        return {
          ...state,
          cart: state?.cart?.map((item) =>
            item.id === findProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state?.cart, action.payload],
      };
    case ACTIONSCART.CLEAR_CART:
      return initialCartState;
    case ACTIONSCART.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state?.cart?.filter((item) => item.key !== action.payload),
      };
    case ACTIONSCART.SET_CART:
      return action.payload;
    case ACTIONSCART.SET_CART_ITEM_QUANTITY:
      return {
        ...state,
        cart: state?.cart?.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity:
                  action.payload.quantity === 0 ? 1 : action.payload.quantity,
              }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
