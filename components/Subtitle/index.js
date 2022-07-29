import PropTypes from "prop-types";

const Subtitle = ({ children, color = "text-black" }) => {
  return <h2 className={`font-bold text-3xl ${color}`}>{children}</h2>;
};

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Subtitle;
