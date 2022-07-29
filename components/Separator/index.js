import PropTypes from "prop-types";
import { useContext } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { desktop, mobile } from "../../config/devices";
import { DeviceContext } from "../../contexts/devices.context";

const Separator = ({
  firts = false,
  active = false,
  text = "Content",
  setStep = () => {},
}) => {
  const color = active ? "border-green-400" : "border-gray-300";
  const textColor = active ? "text-green-400" : "text-gray-400";

  return (
    <div className={`flex items-center ${!firts && "flex-1"}`}>
      {!firts && <div className={`flex-grow border-t-4 ${color}`}></div>}

      <div className="flex flex-col justify-center items-center">
        <AiOutlineCheckCircle className={textColor} size={35} />
        <span className={`flex-shrink mx-4 ${textColor}`}>{text}</span>
      </div>
    </div>
  );
};

Separator.propTypes = {
  firts: PropTypes.bool,
  active: PropTypes.bool,
  text: PropTypes.string,
  setStep: PropTypes.func,
};

export default Separator;
