import PropTypes from "prop-types";
import Loader from "../Loader";

const Button = ({
  children,
  onClick = () => {},
  loading = false,
  bg = "bg-black",
  color = "text-white",
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={loading}
      className={`${bg} ${color} py-2 px-4 font-bold  rounded-md hover:opacity-75 transition-all w-max`}
    >
      {loading ? <Loader color={color} /> : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,

  loading: PropTypes.bool,
  bg: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
