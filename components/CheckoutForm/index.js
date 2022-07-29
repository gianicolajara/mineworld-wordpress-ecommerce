import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { checkout, mutationClearCart } from "../../utils/wordpress";
import Alert from "../Alert";
import Button from "../Button";
import PropTypes from "prop-types";
import { amouthToStripe } from "../../lib/numbers";

let elementNumber = null;
let elementExp = null;
let elementCvc = null;

const initialLoading = null;

const CheckoutForm = ({
  handleNextStep = () => {},
  setPurchaseData = () => {},
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const { userData } = useContext(UserContext);
  const { stateCart, clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (elements) {
      elementNumber =
        elements?.getElement("cardNumber") ||
        elements?.create("cardNumber", {
          showIcon: true,
        });
      elementExp =
        elements?.getElement("cardExpiry") || elements?.create("cardExpiry");
      elementCvc =
        elements?.getElement("cardCvc") || elements?.create("cardCvc");

      elementNumber.mount("#card-number");
      elementExp.mount("#card-expiry");
      elementCvc.mount("#card-cvc");
    }

    return () => {
      elementNumber.unmount();
      elementExp.unmount();
      elementCvc.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await stripe.createPaymentMethod({
        type: "card",
        card: elementNumber,
        billing_details: {
          name: `${userData?.customer?.billing?.firstName} ${userData?.customer?.billing?.lastName}`,
          email: userData?.user?.email || "",
          address: {
            country: userData?.customer?.billing?.country || "",
          },
        },
      });

      if (!res.error) {
        const resfromBackendCheckout = await axios.post("/api/checkout", {
          id: res?.paymentMethod?.id || "",
          amount: Math.floor(Number(stateCart?.total.slice(1)) * 100) || 0,
          customer: res?.paymentMethod?.billing_details,
          description:
            `Compra de ${stateCart?.cart
              .map((product) => product.name)
              .join(", ")}` || "Compra Mineworld",
        });

        if (
          resfromBackendCheckout?.data?.statusCode === 200 &&
          resfromBackendCheckout?.data?.paymentIntent &&
          resfromBackendCheckout &&
          resfromBackendCheckout?.data?.paymentIntent?.status === "succeeded"
        ) {
          const resCheckOut = await axios.post("/api/cart/checkoutCart");

          if (resCheckOut.status === 200) {
            setPurchaseData(resCheckOut?.data?.data);

            const resClearCart = await axios.post("/api/cart/clearCart");

            if (resClearCart.status === 200) {
              clearCart();
              setLoading(initialLoading);
              handleNextStep();
              return;
            } else {
              setError("Algo salio mal en el clearCart checkout");
            }
          }
        } else {
          setError("Algo salio mal con el checkout del carrito");
        }
      } else {
        setError(res?.error?.message || "Algo salio mal");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Algo salio mal");
    }

    setLoading(initialLoading);
  };

  return (
    <form className="flex flex-col gap-3">
      <div
        id="card-number"
        className="w-full border-[3px] border-slate-200 p-3 rounded-lg"
      ></div>
      <div className="flex gap-3">
        <div
          id="card-expiry"
          className="w-full border-[3px] border-slate-200 p-3 rounded-lg"
        ></div>
        <div
          id="card-cvc"
          className="w-full border-[3px] border-slate-200 p-3 rounded-lg"
        ></div>
      </div>

      <Button onClick={handleSubmit} loading={loading}>
        Pagar
      </Button>
      {error && <Alert type="error" messages={error} setMessage={setError} />}
    </form>
  );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
  handleNextStep: PropTypes.func,
  setPurchaseData: PropTypes.func,
};
