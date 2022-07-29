import PropTypes from "prop-types";

const CardTitle = ({ children, color = "text-black" }) => {
  return <h3 className={`font-bold text-2xl ${color}`}>{children}</h3>;
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardTitle;
