import { loadStripe } from "@stripe/stripe-js";
import { createContext, useEffect, useState } from "react";

let stripePromise = null;

export const LoadStripeContext = createContext(null);

const LoadStripeContextProvider = ({ children }) => {
  const [stripeData, setStripeData] = useState(null);

  const handleLoadStripe = async () => {
    if (!stripePromise) {
      stripePromise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      setStripeData(stripePromise);
    }
  };

  useEffect(() => {
    handleLoadStripe();
  }, []);

  const data = {
    stripeData,
  };

  return (
    <LoadStripeContext.Provider value={data}>
      {children}
    </LoadStripeContext.Provider>
  );
};

export default LoadStripeContextProvider;
