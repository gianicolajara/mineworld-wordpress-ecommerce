import { BiLoader } from "react-icons/bi";
import PropTypes from "prop-types";

const Loader = ({ color = "text-black" }) => {
  return <BiLoader className={`animate-spin ${color}`} size={25} />;
};

Loader.propTypes = {
  color: PropTypes.string,
};

export default Loader;
