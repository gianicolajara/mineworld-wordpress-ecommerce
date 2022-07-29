import { useContext, useEffect, useState } from "react";
import BillInformation from "../components/Billing/BillInformation";
import Congratulation from "../components/Billing/Congratulation";
import PaymentMethods from "../components/Billing/PaymentMethods";
import ProductsList from "../components/Billing/ProductsList";
import StepByStepPay from "../components/StepByStepPay";
import { UserContext } from "../contexts/user.context";
import { useRouter } from "next/router";
import Wrapper from "../components/Wrapper";
import GeneralLayout from "../components/layouts/generalLayout";

const Checkout = () => {
  const [stateStep, setStateStep] = useState(1);
  const [purchaseData, setPurchaseData] = useState(null);
  const { userData, loading } = useContext(UserContext);

  const router = useRouter();

  const handleNextStep = () => {
    setStateStep(stateStep + 1);
  };

  const handlePrevStep = () => {
    setStateStep(stateStep - 1);
  };

  const handleSetStep = (step) => {
    setStateStep(step);
  };

  useEffect(() => {
    if (loading && !userData) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, userData]);

  return (
    <StepByStepPay
      billing={<BillInformation handleNext={handleNextStep} />}
      purchase={
        <ProductsList
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      }
      paymentMethods={
        <PaymentMethods
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          setPurchaseData={setPurchaseData}
        />
      }
      congrats={
        <Congratulation
          purchaseData={purchaseData}
          setPurchaseData={setPurchaseData}
        />
      }
      step={stateStep}
      setSetp={handleSetStep}
    />
  );
};

Checkout.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Checkout;
