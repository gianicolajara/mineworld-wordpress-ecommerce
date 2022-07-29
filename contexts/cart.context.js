import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialCartState } from "../config/initialsConfig";
import cartReducer from "../reducers/cart.reducer";
import { UserContext } from "./user.context";

const initialOpen = false;
const initialLoading = false;
const initialReload = false;

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [stateCart, dispatchCart] = useReducer(cartReducer, initialCartState);
  const [open, setOpen] = useState(initialOpen);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(initialLoading);
  const [reload, setReload] = useState(initialReload);

  const getItemsFromCart = async () => {
    setLoading(true);
    try {
      const {
        data: { data: res },
      } = await axios.post("/api/cart/getCart");

      if (res) {
        const newCart = res?.contents?.edges?.map(({ node }) => ({
          ...node?.product.node,
          quantity: node?.quantity,
          key: node?.key,
        }));

        const prices = {
          subtotal: res?.subtotal,
          subtotalTax: res?.subtotalTax,
          total: res?.total,
          totalTax: res?.totalTax,
        };

        setCart({ cart: newCart, prices });
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSetOpenCart = () => {
    setOpen(true);
  };

  const handleSetCloseCart = () => {
    setOpen(false);
  };

  const toggleCart = () => {
    setOpen(!open);
  };

  const addToCart = (item) => {
    const newItem = {
      ...item,
      quantity: 1,
    };

    dispatchCart({
      type: "ADD_TO_CART",
      payload: newItem,
    });

    handleSetOpenCart();
  };

  const deleteToCart = (id) => {
    dispatchCart({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const clearCart = () => {
    dispatchCart({
      type: "CLEAR_CART",
    });
  };

  const updateQuantity = (item) => {
    dispatchCart({
      type: "SET_CART_ITEM_QUANTITY",
      payload: item,
    });
    setReload(true);
  };

  const setCart = (cart) => {
    dispatchCart({
      type: "SET_CART",
      payload: cart,
    });
  };

  const setLoadingTrue = () => {
    setLoading(true);
  };

  const setLoadingFalse = () => {
    setLoading(false);
  };

  const refreshCart = (cart) => {
    setReload(false);
    dispatchCart({
      type: "SET_CART",
      payload: cart,
    });
  };

  useEffect(() => {
    if (userData) {
      getItemsFromCart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const data = {
    stateCart,
    addToCart,
    deleteToCart,
    clearCart,
    updateQuantity,
    open,
    handleSetOpenCart,
    handleSetCloseCart,
    toggleCart,
    setCart,
    setLoadingTrue,
    setLoadingFalse,
    loading,
    reload,
    refreshCart,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
