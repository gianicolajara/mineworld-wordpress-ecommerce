import React, { useContext, useState } from "react";
import Separator from "../Separator";
import PropTypes from "prop-types";
import { DeviceContext } from "../../contexts/devices.context";
import { desktop } from "../../config/devices";

const StepByStepPay = ({
  billing,
  purchase,
  paymentMethods,
  congrats,
  step = 1,
  setSetp = () => {},
}) => {
  const { device } = useContext(DeviceContext);

  const itemsStep = [
    {
      id: 1,
      text: "Facturación",
      component: billing,
      active: step >= 1,
      firts: true,
    },
    {
      id: 2,
      text: "Productos",
      component: purchase,
      active: step >= 2,
      firts: false,
    },
    {
      id: 3,
      text: "Métodos de pago",
      component: paymentMethods,
      active: step >= 3,
      firts: false,
    },
    {
      id: 4,
      text: "Gracias",
      component: congrats,
      active: step >= 4,
      firts: false,
    },
  ];

  return (
    <>
      {desktop(device) && (
        <div className="flex w-full pt-10">
          {itemsStep.map((item) => (
            <Separator
              key={item.id}
              text={item.text}
              firts={item.firts}
              active={item.active}
            />
          ))}
        </div>
      )}

      {step === 1 && billing}
      {step === 2 && purchase}
      {step === 3 && paymentMethods}
      {step === 4 && congrats}
    </>
  );
};

StepByStepPay.propTypes = {
  billing: PropTypes.element,
  purchase: PropTypes.element,
  paymentMethods: PropTypes.element,
  congrats: PropTypes.element,
  step: PropTypes.number,
  setSetp: PropTypes.func,
};

export default StepByStepPay;
