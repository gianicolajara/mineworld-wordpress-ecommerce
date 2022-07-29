import PropTypes from "prop-types";

const Title = ({ children, color = "text-black" }) => {
  return <h2 className={`font-bold text-5xl ${color}`}>{children}</h2>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
