import { useContext, useState } from "react";
import Loader from "../Loader";
import Subtitle from "../Subtitle";
import Wrapper from "../Wrapper";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";
import { LoadStripeContext } from "../../contexts/loadStripe.context";
import Button from "../Button";
import PropTypes from "prop-types";
/* import axios from "axios";
import { useRouter } from "next/router"; */

const TYPESOFPAYMENT = {
  paypal: "Paypal",
  stripe: "Stripe",
};

const initialMethod = TYPESOFPAYMENT.stripe;
const initialLoading = false;

const PaymentMethods = ({
  handlePrevStep = () => {},
  handleNextStep = () => {},
  setPurchaseData = () => {},
}) => {
  const { stripeData } = useContext(LoadStripeContext);
  const [method, setMethod] = useState(initialMethod);
  const [loading, setLoading] = useState(initialLoading);

  /* 
  const handlePaypalPayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios("/api/paypal/createOrder");

      router.push(data.data.links[1].href, "", {
        
      });

      window.open(data.data.links[1].href, "_blank");

      const resGetOrder = await axios(`/api/paypal/captureOrder/${data.id}`);
    } catch (error) {
      console.error(error);
    }
    setLoading(initialLoading);
  }; */

  return (
    <section>
      <Wrapper last>
        <div className="mb-5">
          <Subtitle>Metodos de pago</Subtitle>
        </div>
        {/* <div className="flex gap-3">
          <Button onClick={() => setMethod(TYPESOFPAYMENT.stripe)}>
            Stripe
          </Button>
          <Button onClick={() => setMethod(TYPESOFPAYMENT.paypal)}>
            Paypal
          </Button>
        </div> */}
        {method === TYPESOFPAYMENT.stripe && (
          <>
            {stripeData ? (
              <Elements stripe={stripeData}>
                <CheckoutForm
                  handleNextStep={handleNextStep}
                  setPurchaseData={setPurchaseData}
                />
              </Elements>
            ) : (
              <Loader />
            )}
          </>
        )}
        {/*  {method === TYPESOFPAYMENT.paypal && (
          <>
            <Button onClick={handlePaypalPayment} loading={loading}>
              Pagar
            </Button>
          </>
        )} */}
        <div className="mt-5">
          <Button onClick={handlePrevStep}>Anterior</Button>
        </div>
      </Wrapper>
    </section>
  );
};

PaymentMethods.propTypes = {
  handlePrevStep: PropTypes.func,
  handleNextStep: PropTypes.func,
  setPurchaseData: PropTypes.func,
};

export default PaymentMethods;
