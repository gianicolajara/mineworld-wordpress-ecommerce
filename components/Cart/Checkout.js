import Button from "../Button";
import PropTypes from "prop-types";
import { numberPriceToString } from "../../lib/numbers";
import { mutationClearCart, mutationSetItemsCart } from "../../utils/wordpress";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { useRouter } from "next/router";
import axios from "axios";

const initialLoading = false;

const Checkout = () => {
  const { userData } = useContext(UserContext);
  const {
    stateCart,
    reload,
    refreshCart,
    setLoadingTrue,
    setLoadingFalse,
    handleSetCloseCart,
  } = useContext(CartContext);
  const [loading, setLoading] = useState(initialLoading);
  const router = useRouter();

  const handleBuy = async () => {
    setLoading(true);

    if (!userData) {
      setLoading(initialLoading);
      return router.push("/login");
    }

    /* const itemsToSetInCart = stateCart?.cart?.map((item) => ({
      databaseId: item?.databaseId,
      quantity: item?.quantity,
    }));
 */
    /* try {
      const resClearCart = await mutationClearCart({
        userData,
      });

      if (resClearCart) {
        const resSetItem = await mutationSetItemsCart({
          items: itemsToSetInCart,
          userData,
        });

        if (resSetItem) {
          handleSetCloseCart();
          router.push("/checkout");
        }
      }
    } catch (error) {
      console.error(error);
    } */
    handleSetCloseCart();

    router.push("/checkout");

    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    setLoadingTrue();

    try {
      const res = await axios.post("/api/cart/clearCart");

      if (res.status === 200) {
        const resSetCart = await axios.post("/api/cart/setItems", {
          items: stateCart?.cart,
        });

        if (resSetCart.status === 200) {
          const newCart = resSetCart?.data?.data?.contents?.edges?.map(
            ({ node }) => ({
              ...node?.product.node,
              quantity: node?.quantity,
              key: node?.key,
            })
          );

          const prices = {
            subtotal: resSetCart?.data?.data?.subtotal,
            subtotalTax: resSetCart?.data?.data?.subtotalTax,
            total: resSetCart?.data?.data?.total,
            totalTax: resSetCart?.data?.data?.totalTax,
          };

          refreshCart({ cart: newCart, prices });
        }
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    setLoadingFalse();
  };

  return (
    <div className="w-full h-full p-10 flex flex-col justify-between">
      <div className="flex justify-between text-white">
        <p>Subtotal:</p>
        <p>
          $
          {stateCart?.cart?.length > 0 &&
            stateCart?.cart
              .reduce(
                (prev, curr) =>
                  (prev += numberPriceToString(curr.price, curr.quantity)),
                0
              )
              .toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between text-white">
        <p>Impuestos:</p>
        <p>Calculado al comprar</p>
      </div>
      <div className="flex justify-between text-white">
        <p>Total:</p>
        <p>
          $
          {stateCart?.cart?.length > 0 &&
            stateCart?.cart
              .reduce(
                (prev, curr) =>
                  (prev += numberPriceToString(curr.price, curr.quantity)),
                0
              )
              .toFixed(2)}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          bg="bg-white"
          color="text-black"
          onClick={handleBuy}
          loading={loading}
        >
          Comprar
        </Button>

        {reload && (
          <Button
            bg="bg-white"
            color="text-black"
            loading={loading}
            onClick={handleRefresh}
          >
            Actualizar
          </Button>
        )}
      </div>
    </div>
  );
};

Checkout.propTypes = {
  stateCart: PropTypes.array,
};

export default Checkout;
