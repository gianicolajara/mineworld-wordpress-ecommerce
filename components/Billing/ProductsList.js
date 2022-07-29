import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import { getCartService } from "../../utils/wordpress";
import Button from "../Button";
import Loader from "../Loader";
import Subtitle from "../Subtitle";
import Wrapper from "../Wrapper";
import PropTypes from "prop-types";
import { CartContext } from "../../contexts/cart.context";
import axios from "axios";

const cartToShopInitial = null;

const ProductsList = ({
  handleNextStep = () => {},
  handlePrevStep = () => {},
}) => {
  const [cartToShop, setCartToShop] = useState(cartToShopInitial);
  const { userData } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  const getCart = async () => {
    try {
      /* const res = await getCartService({
        userData,
      }); */

      const res = await axios.post("/api/cart/getCart");

      if (res.status === 200) {
        const newCart =
          res?.data?.data?.contents?.edges?.map(({ node }) => ({
            ...node?.product?.node,
            quantity: node?.quantity,
            key: node?.key,
          })) || [];

        const prices = {
          subtotal: res?.data?.data?.subtotal || "",
          subtotalTax: res?.data?.data?.subtotalTax || "",
          total: res?.data?.data?.total || "",
          totalTax: res?.data?.data?.totalTax || "",
        };

        setCart({
          cart: newCart,
          ...prices,
        });

        setCartToShop(res?.data?.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData) {
      getCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <section>
      <Wrapper last>
        <div className="mb-5">
          <Subtitle>Compra </Subtitle>
        </div>
        <div className="flex gap-3 flex-col">
          {cartToShop ? (
            <>
              {cartToShop?.contents?.edges.map(({ node }) => (
                <article
                  key={node?.key}
                  className="flex w-full border-2 border-slate-200 p-5"
                >
                  <div className="max-w-[40%] w-full flex flex-col items-start">
                    <p className="font-bold">
                      {node?.product?.node?.name || ""}
                    </p>
                    <p>{node?.product?.node?.price}</p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <p>{node?.quantity}</p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <p>{node?.total}</p>
                  </div>
                </article>
              ))}
              <div className="w-full flex justify-between text-right">
                <div className="flex justify-center items-center gap-3">
                  <Button onClick={handlePrevStep}>Anterior</Button>
                  <Button onClick={handleNextStep}>Siguiente</Button>
                </div>
                <div>
                  <p>
                    <span className="font-bold">Taxes: </span>
                    {cartToShop?.totalTax}
                  </p>
                  <p>
                    <span className="font-bold">Subtotal: </span>
                    {cartToShop?.subtotal}
                  </p>
                  <p>
                    <span className="font-bold">Total: </span>
                    {cartToShop?.total}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </Wrapper>
    </section>
  );
};

ProductsList.propTypes = {
  handleNextStep: PropTypes.func,
  handlePrevStep: PropTypes.func,
};

export default ProductsList;
